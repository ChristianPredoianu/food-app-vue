<script setup>
import { useRoundNumber } from '@/composables/useRoundNumber';

const props = defineProps({
  mealNutrients: Object,
});

const { roundNumber } = useRoundNumber();
</script>

<template>
  <li
    class="nutrients-list-item"
    v-for="mealNutrient in mealNutrients"
    :key="mealNutrient.label"
  >
    <div class="meal-nutrients">
      <div class="nutrient">
        <p class="nutrient__label">{{ mealNutrient.label }}</p>
        <p class="nutrient__value">{{ roundNumber(mealNutrient.quantity) }}%</p>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/nutrients/nutrients-list-item';
</style>
