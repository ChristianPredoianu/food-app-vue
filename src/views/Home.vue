<script async setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '@/composables/useFetch';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import { useModal } from '@/composables/useModal';

import SearchBox from '@/components/SearchBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealCard from '@/components/cards/MealCard.vue';
import Backdrop from '@/components/modal/Backdrop.vue';
import Modal from '@/components/modal/Modal.vue';

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

const scrollComponent = ref(null);

const { isFetching } = useInfiniteScroll(fetchMoreMeals);
const { isModalOpen, openModal, closeModal } = useModal();

const router = useRouter();

onBeforeMount(async () => {
  if (props.queriedMealData === null) {
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`,
      appId = import.meta.env.VITE_APP_ID,
      apiKey = import.meta.env.VITE_API_KEY,
      diet = 'balanced',
      dishType = 'Main%20course';

    const mealsUrl = `${baseUrl}&app_id=${appId}&app_key=${apiKey}&diet=${diet}&dishType=${dishType}`;

    const { data, isLoading } = await useFetch(mealsUrl);

    state.mealsData = data.value;
    state.isLoadingMeals = isLoading.value;

    console.log(data.value.hits);
  } else {
    setFilteredMeals(props.queriedMealData);
  }
});

async function fetchMoreMeals() {
  const nextMealsUrl = state.mealsData._links.next.href;

  if (state.mealsData.hits.length < 60) {
    const { data } = await useFetch(nextMealsUrl);
    state.mealsData.hits.push(...data.value.hits);
  }
  isFetching.value = false;
}

function extractIdFromUri(uri) {
  return uri.split('#recipe_').pop();
}

function goToMealDetails(meal) {
  router.push({
    name: 'MealDetails',
    params: {
      id: extractIdFromUri(meal.recipe.uri),
    },
  });
}

function setFilteredMeals(mealsData) {
  if (mealsData.hits.length > 0) {
    state.isInitialRecepies = false;
    state.mealsData = mealsData;
    state.isFoundMeals = true;
    state.isLoadingMeals = false;
  } else {
    state.mealsData = null;
    state.isFoundMeals = false;
  }
}

watch(
  () => props.queriedMealData,
  (queriedMeals) => {
    setFilteredMeals(queriedMeals);
  }
);
</script>

<template>
  <div v-if="isModalOpen">
    <Backdrop @closeModal="closeModal" />
    <Modal @closeModal="closeModal" @filteredData="setFilteredMeals" />
  </div>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox @openModal="openModal" @queryMeals="setFilteredMeals" />
  </div>
  <section class="section-top-meals container" ref="scrollComponent">
    <h2
      class="heading-secondary"
      v-if="state.isInitialRecepies && state.isFoundMeals"
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
    <div class="loading-spinner" v-if="isFetching">
      <LoadingSpinner />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
