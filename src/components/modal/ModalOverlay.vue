<script setup>
import { reactive } from 'vue';

import { meals } from '@/utils/filterData.js';

import SelectDropdown from '@/components/filters/SelectDropdown.vue';

const selectedOptions = reactive({
  mealType: null,
  dishType: null,
  cuisineType: null,
});

function test(val, index) {
  val === '' ? (selectedOptions[index] = null) : (selectedOptions[index] = val);
}
</script>

<template>
  <div class="modal-overlay">
    <div class="selects">
      <div class="dropdown" v-for="(meal, index) in meals">
        <SelectDropdown :meals="meal" :index="index" @emitValue="test" />
      </div>
    </div>
  </div>
  <div class="meal-tags">
    <div class="meal-tag" v-for="selectedOption in selectedOptions">
      {{ selectedOption }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal-overlay';
</style>
