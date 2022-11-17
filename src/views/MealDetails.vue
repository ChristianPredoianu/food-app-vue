<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '@/composables/useFetch';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealDigestList from '@/components/meal/meal-digest/MealDigestList.vue';
import IngredientsList from '@/components/meal/ingredients/IngredientsList.vue';

const state = reactive({
  mealData: null,
  isLoadingMeal: true,
  isFetchError: false,
});

const route = useRoute();

const mealUrl = `https://api.edamam.com/api/recipes/v2/${route.params.id}?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c`;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

onMounted(async () => {
  const { data, isLoading } = await useFetch(mealUrl);

  state.mealData = data.value;
  state.isLoadingMeal = isLoading.value;
  console.log(data.value);
});

if (state.mealData) {
  console.log(state.mealData.value);
}
</script>
<template>
  <div>
    <div class="loading-spinner" v-if="state.isLoadingMeal">
      <LoadingSpinner />
    </div>

    <main class="main container" v-if="state.mealData">
      <section class="section-meal" v-if="!state.isLoadingMeal">
        <div class="meal-info">
          <h1 class="heading-primary">{{ state.mealData.recipe.label }}</h1>
          <h2 class="heading-secondary">
            {{ capitalizeFirstLetter(state.mealData.recipe.dishType[0]) }}
          </h2>
          <div class="meal-digest">
            <MealDigestList :mealData="state.mealData" />
          </div>
        </div>
        <div class="meal-img-container">
          <img
            :src="state.mealData.recipe.image"
            alt="meal"
            class="meal-img-container__img"
          />
        </div>
      </section>
      <section class="section-ingredients" v-if="!state.isLoadingMeal">
        <IngredientsList :mealData="state.mealData" />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/meal-details';
</style>
