<script setup>
import { computed, ref, reactive } from 'vue';
import { meals } from '@/utils/filterData.js';
import { useFetch } from '@/composables/useFetch';
import SelectDropdown from '@/components/filters/SelectDropdown.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';
import MainBtn from '@/components/buttons/MainBtn.vue';

const selectedOptions = reactive({
  diet: null,
  health: null,
  mealType: null,
  dishType: null,
  cuisineType: null,
});

const isOptionsSelected = ref(true);

const emit = defineEmits(['closeModal', 'filteredData']);

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}

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

  isOptionsSelected.value = true;
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

function isSelectedOptions() {
  let isOptions = dishTags.value.length > 0 ? true : false;

  return isOptions;
}

// Transform whitespace to %20 to be able to fetch from api.
function containsWhitespace(str) {
  return str.replace(/\s/g, '%20');
}

function fetchUrl() {
  const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  const appId = import.meta.env.VITE_APP_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  const diet =
    selectedOptions.diet !== null ? `&diet=${selectedOptions.diet}` : '';
  const health =
    selectedOptions.health !== null ? `&health=${selectedOptions.health}` : '';
  const cuisineType =
    selectedOptions.cuisineType !== null
      ? `&cuisineType=${containsWhitespace(selectedOptions.cuisineType)}`
      : '';
  const dishType =
    selectedOptions.dishType !== null
      ? `&dishType=${containsWhitespace(selectedOptions.dishType)}`
      : '';

  const mealsUrl = `${baseUrl}&app_id=${appId}&app_key=${apiKey}${diet}${health}${cuisineType}${dishType}
`;

  return mealsUrl;
}

async function fetchFilteredMeals() {
  isOptionsSelected.value = isSelectedOptions();
  const url = fetchUrl();

  if (isOptionsSelected.value) {
    const { data } = await useFetch(url);
    onCloseModal(data.value);
    onFilteredData(data.value);
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
    <div class="search-btn">
      <MainBtn @handleClick="fetchFilteredMeals">Search Recepies</MainBtn>
    </div>
    <p class="options-error" v-if="!isOptionsSelected">
      You need to select at least one filter
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal-overlay';
</style>
