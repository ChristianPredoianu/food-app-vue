<script setup>
import MealDigestListItem from '@/components/meal/meal-digest/MealDigestListItem.vue';

const props = defineProps({
  mealDigest: Array,
});
</script>

<template>
  <ul class="meal-digest-list">
    <MealDigestListItem :mealDigest="mealDigest" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-digest/meal-digest-list';
</style>
