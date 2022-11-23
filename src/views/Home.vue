<script async setup>
import { onBeforeMount, onUpdated, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '@/composables/useFetch';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';

import SearchBox from '@/components/SearchBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealCard from '@/components/cards/MealCard.vue';

const state = reactive({
  mealsData: null,
  isLoadingMeals: true,
  isFetchError: false,
  isLoadingMoreMeals: true,
});

const scrollComponent = ref(null);

const router = useRouter();

const { isFetching } = useInfiniteScroll(fetchMoreMeals);

const mealsUrl =
  'https://api.edamam.com/api/recipes/v2?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c&diet=balanced&dishType=Main%20course';

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

onBeforeMount(async () => {
  const { data, isLoading } = await useFetch(mealsUrl);

  state.mealsData = data.value;
  state.isLoadingMeals = isLoading.value;
});

async function fetchMoreMeals() {
  const nextMealsUrl = state.mealsData._links.next.href;

  if (state.mealsData.hits.length < 60) {
    const { data } = await useFetch(nextMealsUrl);
    state.mealsData.hits.push(...data.value.hits);
    console.log(isFetching.value);
  }
}
</script>

<template>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox />
  </div>
  <section class="section-top-meals container" ref="scrollComponent">
    <h2 class="heading-secondary">This weeks top recepies</h2>

    <div class="meal-cards" v-if="!state.isLoadingMeals">
      <MealCard
        v-for="meal in state.mealsData.hits"
        :key="meal.recipe.image"
        :meal="meal"
        @click="goToMealDetails(meal)"
      />
    </div>
    <div class="loading-spinner" v-if="!isFetching">
      <LoadingSpinner />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
