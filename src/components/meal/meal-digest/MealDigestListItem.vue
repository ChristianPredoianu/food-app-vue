<script setup>
import { computed } from 'vue';

const props = defineProps({
  mealData: Object,
});

const digestValues = computed(() => props.mealData.recipe.digest.slice(0, 3));

function roundNumber(num) {
  return Math.round(num);
}
</script>

<template>
  <li
    class="meal-digest-list__item"
    v-for="digestValue in digestValues"
    :key="digestValue.label"
  >
    <div class="digest-values">
      <p class="digest-values__label">{{ digestValue.label }}</p>
      <p class="digest-values__total">
        {{ roundNumber(digestValue.total) }} gr
      </p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-digest/meal-digest-list-item';
</style>
