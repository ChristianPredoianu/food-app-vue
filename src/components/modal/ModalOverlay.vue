<script setup>
import { ref, reactive, computed } from 'vue';
import { meals } from '@/utils/filterData.js';
import { useFetch } from '@/composables/useFetch';
import { useUrlToFetch } from '@/composables/useUrlToFetch';
import { useDishTags } from '@/composables/useDishTags';

import SelectDropdown from '@/components/filters/SelectDropdown.vue';
import MealFilterTagList from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagList.vue';
import MainBtn from '@/components/buttons/MainBtn.vue';

const emit = defineEmits(['closeModal', 'filteredData']);

const tags = ref(null);

const props = defineProps({
  selectedOptions: Object,
});

const {
  getSelectValue,
  isOptionsSelected,
  dishTags,
  removeTag,
  isSelectedOptions,
} = useDishTags(props.selectedOptions);

const { fetchUrl } = useUrlToFetch(props.selectedOptions);

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}

function removeTagHandler(tag) {
  removeTag(tag);
}

function getDropdownValue(value, index) {
  getSelectValue(value, index);
}

async function fetchFilteredMeals() {
  isOptionsSelected.value = isSelectedOptions();

  const url = fetchUrl(props.selectedOptions);

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
