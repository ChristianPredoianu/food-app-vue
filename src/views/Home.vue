<script async setup>
import { onBeforeMount, reactive, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '@/composables/useFetch';
import { useDishTags } from '@/composables/useDishTags';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import { useModal } from '@/composables/useModal';
import { useExtractIdFromUri } from '@/composables/useExtractIdFromUri';
import { useUrlToFetch } from '@/composables/useUrlToFetch';

import SearchBox from '@/components/SearchBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';
import MealCard from '@/components/cards/MealCard.vue';
import Backdrop from '@/components/modal/Backdrop.vue';
import Modal from '@/components/modal/Modal.vue';
import Footer from '@/components/Footer.vue';

const props = defineProps({
  queriedMealData: Object,
});

const state = reactive({
  mealsData: null,
  isLoadingMeals: true,
  isFetchError: false,
  isInitialRecepies: true,
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

const { dishTags, removeTag } = useDishTags(selectedOptions);
const { isFetchingOnScroll } = useInfiniteScroll(fetchMoreMeals);
const { isModalOpen, openModal, closeModal } = useModal();
const { extractIdFromUri } = useExtractIdFromUri();

const router = useRouter();

const mealsHeading = computed(() => {
  if (state.isInitialRecepies && !state.isLoadingMeals) {
    return 'This weeks top recepies';
  } else if (!state.isInitialRecepies && !state.isFilteringMeals) {
    return 'Found meals';
  } else if (state.mealsData === null && !state.isLoadingMeals) {
    return ' No recepies found! Try another search query...';
  }
});

async function fetchInitialMeals() {
  if (!isModalOpen.value) {
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`,
      appId = import.meta.env.VITE_APP_ID,
      apiKey = import.meta.env.VITE_API_KEY,
      diet = 'balanced',
      dishType = 'Main%20course';

    const mealsUrl = `${baseUrl}&app_id=${appId}&app_key=${apiKey}&diet=${diet}&dishType=${dishType}`;

    const { data } = await useFetch(mealsUrl);

    state.isLoadingMeals = false;
    state.isInitialRecepies = true;

    setMeals(data.value);
  }
}

async function fetchMoreMeals() {
  const nextMealsUrl = state.mealsData._links.next.href;

  if (state.mealsData.hits.length < 60) {
    const { data } = await useFetch(nextMealsUrl);
    state.mealsData.hits.push(...data.value.hits);
  }
  isFetchingOnScroll.value = false;
}

async function fetchFilteredMeals() {
  state.isFilteringMeals = true;

  const { fetchUrl } = useUrlToFetch(selectedOptions);
  const url = fetchUrl();

  const { data } = await useFetch(url);

  state.isFilteringMeals = false;

  setMeals(data.value);
}

function setMeals(mealsData) {
  if (mealsData.hits.length > 0) {
    state.mealsData = mealsData;
  } else {
    state.mealsData = null;
  }
}

function setIsFiltering(isFiltering) {
  state.isFilteringMeals = isFiltering.value;
  state.isInitialRecepies = false;
}

function goToMealDetails(meal) {
  console.log('hoing');
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

onBeforeMount(() => {
  props.queriedMealData === null || !state.isFilteringMeals
    ? fetchInitialMeals()
    : setMeals(props.queriedMealData);
});

watch(
  () => props.queriedMealData,
  (queriedMeals) => {
    setMeals(queriedMeals);
  }
);

watch(
  () => ({ ...selectedOptions }),
  () => {
    if (dishTags.value.length === 0) {
      fetchInitialMeals();
    }
  }
);
</script>

<template>
  <div v-if="isModalOpen">
    <Backdrop @closeModal="closeModal" />
    <Modal
      :selectedOptions="selectedOptions"
      @closeModal="closeModal"
      @filteredData="setMeals"
      @isFiltering="setIsFiltering"
    />
  </div>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox @openModal="openModal" @queryMeals="setMeals" />
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

    <div
      class="meal-cards"
      v-if="
        !state.isLoadingMeals &&
        state.mealsData !== null &&
        !state.isFilteringMeals
      "
    >
      <MealCard
        v-for="meal in state.mealsData.hits"
        :key="meal.recipe.image"
        :meal="meal"
        @goToDetails="goToMealDetails(meal)"
      />
    </div>
    <div
      class="loading-spinner"
      v-if="
        state.isLoadingMeals || isFetchingOnScroll || state.isFilteringMeals
      "
    >
      <LoadingSpinner />
    </div>
  </section>
  <Footer
    v-if="
      state.mealsData !== null &&
      !state.isLoadingMeals &&
      !state.isFilteringMeals
    "
  />
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
