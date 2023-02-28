<script async setup>
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useInitialMealsUrl } from '@/composables/url/useInitialMealsUrl';
import { useUrlToFetch } from '@/composables/url/useUrlToFetch';
import { useFetch } from '@/composables/useFetch';
import { useDishTags } from '@/composables/useDishTags';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import { useModal } from '@/composables/useModal';
import { useExtractIdFromUri } from '@/composables/url/useExtractIdFromUri';

import SearchBox from '@/components/SearchBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';
import MealCard from '@/components/cards/MealCard.vue';
import Backdrop from '@/components/modal/Backdrop.vue';
import Modal from '@/components/modal/Modal.vue';
import Footer from '@/components/Footer.vue';

const props = defineProps({
  queriedMealsData: Object,
  isNavFiltering: Boolean,
});

const recepies = ref(null);

const state = reactive({
  mealsData: null,
  isLoadingMeals: true,
  isInitialMeals: true,
  isFilteringMeals: false,
});

const selectedOptions = reactive({
  diet: null,
  health: null,
  mealType: null,
  dishType: null,
  cuisineType: null,
});

const scrollComponent = ref(null);

const mealsHeading = computed(() => {
  if (state.isInitialMeals) {
    return 'This weeks top recepies';
  } else if (state.isFilteringMeals && state.mealsData.hits.length > 0) {
    return 'Found meals';
  } else if (state.mealsData.hits.length === 0) {
    return ' No recepies found!';
  }
});

const router = useRouter();
const { initialMealsUrl } = useInitialMealsUrl();
const { fetchUrl } = useUrlToFetch(selectedOptions);
const { data, isLoading, fetchData } = useFetch();
const { isFetchingOnScroll } = useInfiniteScroll(fetchMoreMeals);
const { extractIdFromUri } = useExtractIdFromUri();
const { isModalOpen, openModal, closeModal } = useModal();
const { dishTags, removeTag } = useDishTags(selectedOptions);

async function fetchInitialMeals() {
  if (!isModalOpen.value) {
    await fetchData(initialMealsUrl.value);
    setInitialMeals(data.value);
  }
}

async function fetchMoreMeals() {
  const isNextPage = Object.keys(recepies.value._links).length > 0;
  const maxHits = recepies.value.hits.length >= 60;

  if (isNextPage) {
    const nextMealsUrl = recepies.value._links.next.href;

    if (!maxHits) {
      await fetchData(nextMealsUrl);
      recepies.value.hits.push(...data.value.hits);
    }
  }
  isFetchingOnScroll.value = false;
}

async function fetchFilteredMeals() {
  state.isFilteringMeals = true;

  await fetchData(fetchUrl.value);
  setFilteredMeals(data.value);
}

function setInitialMeals(initialMeals) {
  state.mealsData = initialMeals;
  state.isInitialMeals = true;
  state.isFilteringMeals = false;
}

function setFilteredMeals(filteredMeals) {
  state.mealsData = filteredMeals;
  state.isInitialMeals = false;
  state.isFilteringMeals = true;
}

function setQueriedMeals(queriedMeals) {
  state.mealsData = queriedMeals;
  state.isInitialMeals = false;
  state.isFilteringMeals = true;
}

function goToMealDetails(meal) {
  router.push({
    name: 'MealDetails',
    params: {
      id: extractIdFromUri(meal.recipe.uri),
    },
  });
}

function removeTagHandler(tag) {
  removeTag(tag);
  fetchFilteredMeals();
}

watch(
  () => [props.queriedMealData, props.isNavFiltering],
  ([queriedMeals, isFiltering]) => {
    isFiltering ? setQueriedMeals(queriedMeals) : fetchInitialMeals();
  }
);

watch(
  () => ({ ...selectedOptions }),
  () => {
    if (dishTags.value.length === 0) fetchInitialMeals();
  }
);

onMounted(() => {
  fetchInitialMeals();
});
</script>

<template>
  <div>
    <div v-if="isModalOpen">
      <Backdrop @closeModal="closeModal" />
      <Modal
        :selectedOptions="selectedOptions"
        @closeModal="closeModal"
        @filteredData="setFilteredMeals"
      />
    </div>
    <div class="showcase">
      <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
      <SearchBox
        @openModal="openModal"
        @queriedMealsData="setQueriedMeals"
        @fetchInitialMeals="fetchInitialMeals"
      />
    </div>
    <section class="section-top-meals container" ref="scrollComponent">
      <div class="filter-tags">
        <MealFilterTagList
          :dishTags="dishTags"
          @removeTag="removeTagHandler"
          v-if="dishTags.length > 0"
        />
      </div>
      <h2 class="heading-secondary">
        {{ mealsHeading }}
      </h2>
      <div class="meal-cards" v-if="state.mealsData">
        <MealCard
          v-for="meal in state.mealsData.hits"
          :key="meal.recipe.image"
          :meal="meal"
          @goToDetails="goToMealDetails(meal)"
        />
      </div>
    </section>
    <div class="loading-spinner" v-if="isLoading || isFetchingOnScroll">
      <LoadingSpinner />
    </div>
    <Footer v-if="!isLoading" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
