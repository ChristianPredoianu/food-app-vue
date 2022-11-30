<script setup>
import { computed, reactive } from 'vue';

import { meals } from '@/utils/filterData.js';

import SelectDropdown from '@/components/filters/SelectDropdown.vue';

const selectedOptions = reactive({
  Diet: null,
  Health: null,
  mealType: null,
  dishType: null,
  cuisineType: null,
});

const dishTags = computed(() => {
  const dishValues = Object.values(selectedOptions);

  const tags = [];

  for (let i = 0; i < dishValues.length; i++) {
    if (dishValues[i] !== null) {
      tags.push(dishValues[i]);
    }
  }

  return tags;
});

function getSelectValue(value, index) {
  value === ''
    ? (selectedOptions[index] = null)
    : (selectedOptions[index] = value);
}
</script>

<template>
  <div class="modal-overlay">
    <div class="selects">
      <SelectDropdown
        v-for="(meal, index) in meals"
        :meals="meal"
        :index="index"
        @emitValue="getSelectValue"
      />
    </div>
    <div class="meal-tags">
      <p class="tags" v-for="selectedOption in dishTags">
        {{ selectedOption }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal-overlay';
</style>
