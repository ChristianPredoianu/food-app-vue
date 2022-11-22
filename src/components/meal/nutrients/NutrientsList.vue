<script setup>
import NutrientsListItem from '@/components/meal/nutrients/NutrientsListItem.vue';

const props = defineProps({
  mealNutrients: Object,
});
</script>

<template>
  <ul class="nutrients-list">
    <NutrientsListItem :mealNutrients="mealNutrients" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/nutrients/nutrients-list';
</style>
