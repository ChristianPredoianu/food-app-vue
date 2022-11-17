<script setup>
import IngredientsListItem from '@/components/meal/ingredients/IngredientsListItem.vue';

const props = defineProps({
  mealData: Object,
});
</script>

<template>
  <ul class="ingredients-list">
    <IngredientsListItem :mealData="mealData" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/ingredients/ingredients-list';
</style>
