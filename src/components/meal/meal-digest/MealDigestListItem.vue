<script setup>
import { computed } from 'vue';
import { useRoundNumber } from '@/composables/helpers/useRoundNumber';

const props = defineProps({
  mealDigest: Array,
});

const { roundNumber } = useRoundNumber();

const firstThreeDigestValues = computed(() => props.mealDigest.slice(0, 3));
</script>

<template>
  <li
    class="meal-digest-list-item"
    v-for="digestValue in firstThreeDigestValues"
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
