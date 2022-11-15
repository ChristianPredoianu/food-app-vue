<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/useFetch';

import SearchBox from '@/components/SearchBox.vue';

const mealsData = ref(null);
const isLoadingMeals = ref(true);
const isFetchError = ref(false);

onBeforeMount(async () => {
  const { data, isLoading } = await useFetch(
    'https://api.edamam.com/api/recipes/v2?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c&diet=balanced&dishType=Main%20course'
  );

  mealsData.value = data.value;
  isLoadingMeals.value = isLoading.value;
  console.log(mealsData.value.hits);
});
</script>

<template>
  <div class="showcase">
    <img src="@/assets/food.jpg" alt="food" class="showcase-img" />
    <SearchBox />
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/views/home';
</style>
