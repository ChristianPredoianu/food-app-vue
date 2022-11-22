<script setup>
import MealTagItem from '@/components/meal/meal-tags/MealTagItem.vue';

const props = defineProps({
  mealTags: Array,
});
</script>

<template>
  <ul class="meal-tags-list">
    <MealTagItem :mealTags="mealTags" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-tags-list';
</style>
