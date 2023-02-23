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
import MainBtn from '@/components/buttons/MainBtn.vue';
import Footer from '@/components/Footer.vue';

const { data, isLoading, fetchData } = useFetch();

const route = useRoute();

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const mealUrl = `https://api.edamam.com/api/recipes/v2/${route.params.id}?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c`;

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
    <Footer v-if="!isLoading" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/meal-details';
</style>
