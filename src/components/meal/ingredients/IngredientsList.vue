<script setup>
import IngredientsListItem from '@/components/meal/ingredients/IngredientsListItem.vue';

const props = defineProps({
  mealIngredients: Array,
});
</script>

<template>
  <ul class="ingredients-list">
    <IngredientsListItem :mealIngredients="mealIngredients" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/ingredients/ingredients-list';
</style>
