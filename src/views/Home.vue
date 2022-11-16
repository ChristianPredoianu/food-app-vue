<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '@/composables/useFetch';

import SearchBox from '@/components/SearchBox.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealCard from '@/components/cards/MealCard.vue';

const state = reactive({
  mealsData: null,
  isLoadingMeals: true,
  isFetchError: false,
});
/* const mealsData = ref(null);
const isLoadingMeals = ref(true);
const isFetchError = ref(false);
 */
const router = useRouter();

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

onMounted(async () => {
  const { data, isLoading } = await useFetch(
    'https://api.edamam.com/api/recipes/v2?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c&diet=balanced&dishType=Main%20course'
  );
  state.mealsData = data.value.hits;
  state.isLoadingMeals = isLoading.value;
});
</script>

<template>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox />
  </div>
  <section class="section-top-meals container">
    <h2 class="heading-secondary">This weeks top recepies</h2>
    <div v-if="state.isLoadingMeals" class="loading-spinner">
      <LoadingSpinner />
    </div>
    <div class="meal-cards" v-else>
      <MealCard
        v-for="meal in state.mealsData"
        :key="meal.recipe.image"
        :meal="meal"
        @click="goToMealDetails(meal)"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
