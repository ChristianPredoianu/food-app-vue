<script setup>
import MealDigestListItem from '@/components/meal/meal-digest/MealDigestListItem.vue';

const props = defineProps({
  mealData: Object,
});
</script>

<template>
  <ul class="meal-digest-list">
    <MealDigestListItem :mealData="mealData" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-digest/meal-digest-list';
</style>
