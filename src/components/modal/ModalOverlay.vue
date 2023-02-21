<script setup>
import { ref, watch } from 'vue';
import { meals } from '@/utils/filterData.js';
import { useFetch } from '@/composables/useFetch';
import { useUrlToFetch } from '@/composables/useUrlToFetch';
import { useDishTags } from '@/composables/useDishTags';

import SelectDropdown from '@/components/filters/SelectDropdown.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';
import MainBtn from '@/components/buttons/MainBtn.vue';

const emit = defineEmits(['closeModal', 'filteredData', 'isFiltering']);

const props = defineProps({
  selectedOptions: Object,
});

const isOptionsSelected = ref(true);
const isFiltering = ref(false);

const { dishTags, removeTag } = useDishTags(props.selectedOptions);

const { fetchUrl } = useUrlToFetch(props.selectedOptions);

function getSelectValue(value, index) {
  value === ''
    ? (props.selectedOptions[index] = null)
    : (props.selectedOptions[index] = value);
  isOptionsSelected.value = true;
}

function isSelectedOptions() {
  let isOptions = dishTags.value.length > 0 ? true : false;
  return isOptions;
}

function getDropdownValue(value, index) {
  getSelectValue(value, index);
}

function removeTagHandler(tag) {
  removeTag(tag);
}

async function fetchFilteredMeals() {
  isFiltering.value = true;
  onIsFiltering();

  isOptionsSelected.value = isSelectedOptions();

  const url = fetchUrl();

  if (isOptionsSelected.value) {
    const { data } = await useFetch(url);

    isFiltering.value = false;

    onCloseModal();
    onFilteredData(data.value);
    onIsFiltering();
  }
}

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}

function onIsFiltering() {
  emit('isFiltering', isFiltering);
}
</script>

<template>
  <div class="modal-overlay">
    <div class="selects">
      <SelectDropdown
        v-for="(meal, index) in meals"
        :meals="meal"
        :index="index"
        @emitValue="getDropdownValue"
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
