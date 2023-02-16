<script async setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
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
  isLoadingMoreMeals: true,
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

  const { data, isLoading } = await useFetch(mealsUrl);

  setInitialMeals(data, isLoading);
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
  const { fetchUrl } = useUrlToFetch(selectedOptions);

  const url = fetchUrl();

  const { data, isLoading } = await useFetch(url);
  console.log(data);
  console.log(isLoading);
  setFilteredMeals(data.value, isLoading.value);
}

function setInitialMeals(data, isLoading) {
  state.mealsData = data.value;
  state.isLoadingMeals = isLoading.value;
  state.isInitialRecepies = true;
  state.isFoundMeals = true;
}

function setFilteredMeals(mealsData, isLoading) {
  if (mealsData.hits.length > 0) {
    state.isInitialRecepies = false;
    state.mealsData = mealsData;
    state.isFoundMeals = true;

    state.isLoadingMeals = isLoading;
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

onBeforeMount(async () => {
  if (props.queriedMealData === null || !isFilteringMeals) {
    fetchInitialMeals();
  } else {
    setFilteredMeals(props.queriedMealData);
  }
});

watch(
  () => props.queriedMealData,
  (queriedMeals) => {
    setFilteredMeals(queriedMeals);
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
      @filteredData="setFilteredMeals"
      @isFiltering="setIsFiltering"
    />
  </div>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox @openModal="openModal" @queryMeals="setFilteredMeals" />
  </div>
  <section class="section-top-meals container" ref="scrollComponent">
    <div class="filter-tags">
      <MealFilterTagList
        :dishTags="dishTags"
        @removeTag="removeTagHandler"
        v-if="isFilteringMeals"
      />
    </div>
    <h2
      class="heading-secondary"
      v-if="
        state.isInitialRecepies && state.isFoundMeals && !state.isLoadingMeals
      "
    >
      This weeks top recepies
    </h2>
    <h2
      class="heading-secondary"
      v-if="state.isFoundMeals && !state.isInitialRecepies"
    >
      Found recepies
    </h2>
    <h3 class="heading-tertiary" v-if="!state.isFoundMeals">
      No recepies found! Try another search query...
    </h3>
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
