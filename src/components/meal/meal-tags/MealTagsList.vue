<script setup>
import MealTagListItem from '@/components/meal/meal-tags/MealTagListItem.vue';

const props = defineProps({
  mealTags: Array,
});
</script>

<template>
  <ul class="meal-tags-list">
    <MealTagListItem :mealTags="mealTags" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-tags-list';
</style>
