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

const mealsData = ref(null);

const emit = defineEmits(['closeModal']);

function onCloseModal() {
  emit('closeModal');
  console.log('emmiting');
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

function filterMealsHandler() {
  /*  const isOptionsSelected = isSelectedOptions();

  const mealsUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=2d7284f7&app_key=0a6f557d15da76ad2dea06845fbe542c${
    selectedOptions.diet !== null ? `&diet=${selectedOptions.diet}` : ''
  }${
    selectedOptions.health !== null ? `&health=${selectedOptions.health}` : ''
  }${
    selectedOptions.cuisineType !== null
      ? `&cuisineType=${selectedOptions.cuisineType}`
      : ''
  }${
    selectedOptions.mealType !== null
      ? `&mealType=${selectedOptions.mealType}`
      : ''
  }
  ${
    selectedOptions.dishType !== null
      ? `&dishType=${selectedOptions.dishType}`
      : ''
  }
 
`;

  if (isOptionsSelected) {
    const { data } = await useFetch(mealsUrl);
    mealsData.value = data.value;
  } else {
    console.log('You need to select a filter');
  } */
  onCloseModal();
}

function isSelectedOptions() {
  let isOptions = dishTags.value.length > 0 ? true : false;

  return isOptions;
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
    <MainBtn @handleClick="filterMealsHandler">Search Recepies</MainBtn>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal-overlay';
</style>
