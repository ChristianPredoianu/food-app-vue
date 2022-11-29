<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '@/composables/useFetch';
import { useCapitalizeFirstLetter } from '@/composables/useCapitalizeFirstLetter';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealDigestList from '@/components/meal/meal-digest/MealDigestList.vue';
import IngredientsList from '@/components/meal/ingredients/IngredientsList.vue';
import NutrientsList from '@/components/meal/nutrients/NutrientsList.vue';
import MealTagsList from '@/components/meal/meal-tags/MealTagsList.vue';

const state = reactive({
  mealData: null,
  isLoadingMeal: true,
  isFetchError: false,
});

const route = useRoute();

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const mealUrl = `https://api.edamam.com/api/recipes/v2/${route.params.id}?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c`;

/* function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
} */

onMounted(async () => {
  const { data, isLoading } = await useFetch(mealUrl);

  state.mealData = data.value;
  state.isLoadingMeal = isLoading.value;
  console.log(data.value);
});
</script>
<template>
  <div>
    <div class="loading-spinner" v-if="state.isLoadingMeal">
      <LoadingSpinner />
    </div>

    <main class="main container" v-if="state.mealData && !state.isLoadingMeal">
      <section class="section-meal">
        <div class="meal-info">
          <h1 class="heading-primary">{{ state.mealData.recipe.label }}</h1>
          <h2 class="heading-secondary">
            {{ capitalizeFirstLetter(state.mealData.recipe.dishType[0]) }}
          </h2>
          <div class="meal-digest">
            <MealDigestList :mealDigest="state.mealData.recipe.digest" />
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
      <section class="section-ingredients">
        <div class="ingredients-wrapper">
          <h3 class="heading-tertiary">Ingredients</h3>
          <IngredientsList
            :mealIngredients="state.mealData.recipe.ingredients"
          />
        </div>
        <div class="nutrients-wrapper">
          <h3 class="heading-tertiary">Daily Nutrients</h3>
          <NutrientsList :mealNutrients="state.mealData.recipe.totalDaily" />
        </div>
      </section>
      <a :href="state.mealData.recipe.utl" class="meal-link"
        ><h4>Cook this meal</h4></a
      >
      <section class="section-meal-tags">
        <MealTagsList :mealTags="state.mealData.recipe.healthLabels" />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/meal-details';
</style>
