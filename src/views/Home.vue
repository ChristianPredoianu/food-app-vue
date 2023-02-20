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
  isFoundMeals: true,
  isInitialRecepies: true,
});

const selectedOptions = reactive({
  diet: null,
  health: null,
  mealType: null,
  dishType: null,
  cuisineType: null,
});

const scrollComponent = ref(null);
const isFilteringMeals = ref(false);

const { dishTags, removeTag } = useDishTags(selectedOptions);
const { isFetchingOnScroll } = useInfiniteScroll(fetchMoreMeals);
const { isModalOpen, openModal, closeModal } = useModal();
const { extractIdFromUri } = useExtractIdFromUri();

const router = useRouter();

async function fetchInitialMeals() {
  const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`,
    appId = import.meta.env.VITE_APP_ID,
    apiKey = import.meta.env.VITE_API_KEY,
    diet = 'balanced',
    dishType = 'Main%20course';

  const mealsUrl = `${baseUrl}&app_id=${appId}&app_key=${apiKey}&diet=${diet}&dishType=${dishType}`;

  const { data } = await useFetch(mealsUrl);

  state.isInitialRecepies = true;
  state.isLoadingMeals = false;
  console.log(state.isInitialRecepies);
  console.log(state.isLoadingMeals);
  setMeals(data.value);
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
  state.isLoadingMeals = true;

  const { fetchUrl } = useUrlToFetch(selectedOptions);
  const url = fetchUrl();

  const { data } = await useFetch(url);

  state.isLoadingMeals = false;

  setMeals(data.value);
}

const mealsHeading = computed(() => {
  if (state.isInitialRecepies && !state.isLoadingMeals) {
    return 'This weeks top recepies';
  } else if (
    state.isFoundMeals &&
    !state.isInitialRecepies &&
    !state.isLoadingMeals
  ) {
    return 'Found meals';
  } else if (!state.isFoundMeals) {
    return ' No recepies found! Try another search query...';
  }
});

function setMeals(mealsData) {
  if (mealsData.hits.length > 0) {
    state.isInitialRecepies = false;
    state.mealsData = mealsData;
    state.isFoundMeals = true;
  } else {
    state.mealsData = null;
    state.isFoundMeals = false;
  }
}

function setIsFiltering(isFiltering) {
  isFilteringMeals.value = isFiltering.value;
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

onBeforeMount(() => {
  if (props.queriedMealData === null || !isFilteringMeals) {
    fetchInitialMeals();
  } else {
    setMeals(props.queriedMealData);
  }
});

watch(
  () => props.queriedMealData,
  (queriedMeals) => {
    setMeals(queriedMeals);
    state.isInitialRecepies = false;
    console.log(state.isInitialRecepies);
  }
);

watch(
  () => ({ ...selectedOptions }),
  () => {
    if (dishTags.value.length === 0) {
      fetchInitialMeals();
      isFilteringMeals.value = false;
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
        v-if="isFilteringMeals"
      />
    </div>
    <h2 class="heading-secondary">
      {{ mealsHeading }}
    </h2>
    <!--   <h2
      class="heading-secondary"
      v-if="state.isFoundMeals && !state.isInitialRecepies"
    >
      {{
        state.isFoundMeals && !state.isInitialRecepies
          ? 'Found meals'
          : 'No recepies found! Try another search query...'
      }}
    </h2> -->
    <!--  <h3 class="heading-tertiary" v-if="!state.isFoundMeals">
      No recepies found! Try another search query...
    </h3> -->
    <div
      class="meal-cards"
      v-if="!state.isLoadingMeals && state.mealsData !== null"
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
      v-if="state.isLoadingMeals || isFetchingOnScroll"
    >
      <LoadingSpinner />
    </div>
  </section>
  <Footer v-if="state.mealsData !== null" />
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
