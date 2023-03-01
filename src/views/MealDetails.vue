<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '@/composables/useFetch';
import { useCapitalizeFirstLetter } from '@/composables/helpers/useCapitalizeFirstLetter';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MealDigestList from '@/components/meal/meal-digest/MealDigestList.vue';
import IngredientsList from '@/components/meal/ingredients/IngredientsList.vue';
import NutrientsList from '@/components/meal/nutrients/NutrientsList.vue';
import MealTagsList from '@/components/meal/meal-tags/MealTagsList.vue';
import MainBtn from '@/components/buttons/MainBtn.vue';

const { data, isLoading, fetchData } = useFetch();

const route = useRoute();

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const baseUrl = 'https://api.edamam.com/api/recipes/v2/',
  appId = import.meta.env.VITE_APP_ID,
  apiKey = import.meta.env.VITE_API_KEY;

const mealUrl = `${baseUrl}${route.params.id}?type=public&app_id=${appId}&app_key=${apiKey}`;

onMounted(async () => {
  await fetchData(mealUrl);
});
</script>
<template>
  <div>
    <div class="loading-spinner" v-if="isLoading">
      <LoadingSpinner />
    </div>
    <main class="main container" v-if="data">
      <section class="section-meal">
        <div class="meal-info">
          <h1 class="heading-primary">{{ data.recipe.label }}</h1>
          <h2 class="heading-secondary">
            {{ capitalizeFirstLetter(data.recipe.dishType[0]) }}
          </h2>
          <div class="meal-digest">
            <MealDigestList :mealDigest="data.recipe.digest" />
          </div>
        </div>
        <div class="meal-img-container">
          <img
            :src="data.recipe.image"
            alt="meal"
            class="meal-img-container__img"
          />
        </div>
      </section>
      <section class="section-ingredients">
        <div class="ingredients-wrapper">
          <h3 class="heading-tertiary">Ingredients</h3>
          <IngredientsList :mealIngredients="data.recipe.ingredients" />
        </div>
        <div class="nutrients-wrapper">
          <h3 class="heading-tertiary">Daily Nutrients</h3>
          <NutrientsList :mealNutrients="data.recipe.totalDaily" />
        </div>
      </section>
      <div class="link-btn">
        <a
          :href="data.recipe.url"
          rel="noopener noreferrer"
          target="_blank"
          class="meal-link"
          ><MainBtn>Cook this meal</MainBtn></a
        >
      </div>
      <section class="section-meal-tags">
        <MealTagsList :mealTags="data.recipe.healthLabels" />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/meal-details';
</style>
