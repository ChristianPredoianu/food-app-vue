<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { useFetch } from '@/composables/useFetch';

const route = useRoute();

const state = reactive({
  mealData: null,
  isLoadingMeal: true,
  isFetchError: false,
  digestValues: null,
});

onMounted(async () => {
  const { data, isLoading } = await useFetch(
    `https://api.edamam.com/api/recipes/v2/${route.params.id}?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c`
  );

  state.mealData = data.value;
  state.isLoadingMeal = isLoading.value;

  state.digestValues = data.value.recipe.digest.slice(0, 3);
  console.log(data.value);
});

function roundNumber(num) {
  return Math.round(num);
}
</script>
//MAKE component MEAL LIST & MEAL LIST ITEM
<template>
  <main class="main container" v-if="state.mealData">
    <section class="section-meal">
      <div class="meal-info">
        <h1>{{ state.mealData.recipe.label }}</h1>
        <h2>{{ state.mealData.recipe.dishType[0] }}</h2>
        <div class="meal-digest">
          <ul class="meal-digest-list">
            <li
              v-for="digestValue in state.digestValues"
              class="meal-digest-list__item"
            >
              <div class="digest-values">
                <p class="digest-values__label">{{ digestValue.label }}</p>
                <p class="digest-values__total">
                  {{ roundNumber(digestValue.total) }} gr
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <img :src="state.mealData.recipe.image" alt="meal" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '@/sass/views/meal-details';
</style>
