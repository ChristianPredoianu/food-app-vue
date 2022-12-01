<script setup>
import { computed, ref, reactive } from 'vue';
import { meals } from '@/utils/filterData.js';

import SelectDropdown from '@/components/filters/SelectDropdown.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';

const selectedOptions = reactive({
  diet: null,
  health: null,
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

function removeTagHandler(tag) {
  const foundTag = dishTags.value
    .filter((element) => element === tag)
    .toString();

  for (const key in selectedOptions) {
    if (selectedOptions[key] === foundTag) {
      selectedOptions[key] = null;
    }
  }
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
      <MealFilterTagList :dishTags="dishTags" @removeTag="removeTagHandler" />
    </div>
    <button class="search-btn">Search Recepies</button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal-overlay';
</style>
