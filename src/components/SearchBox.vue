<script setup>
import { ref } from 'vue';
import { useQueryUrl } from '@/composables/url/useQueryUrl';
import { useFetch } from '@/composables/useFetch';

const emit = defineEmits([
  'openModal',
  'queriedMealsData',
  'fetchInitialMeals',
]);

const searchQuery = ref(null);

const { queryUrl } = useQueryUrl(searchQuery.value);
const { data, fetchData } = useFetch();

async function fetchSearchQuery() {
  if (searchQuery.value !== null) {
    const url = queryUrl(searchQuery.value);
    await fetchData(url);

    onQueriedMealsData(data.value);
  }

  if (searchQuery.value === '') {
    onFetchInitialMeals();
  }
}

function onOpenModal() {
  emit('openModal');
}

function onFetchInitialMeals() {
  emit('fetchInitialMeals');
}

function onQueriedMealsData(mealsData) {
  emit('queriedMealsData', mealsData);
}
</script>

<template>
  <div class="search-box">
    <h1 class="search-box__heading">What would you like to cook?</h1>
    <div class="input-container">
      <button class="filter-btn" @click="onOpenModal">Filter</button>
      <font-awesome-icon
        icon="search"
        class="input-icon"
        @click="fetchSearchQuery"
      />
      <input
        class="input-field"
        type="text"
        placeholder="Recepies, ingredients.."
        v-model="searchQuery"
        @keyup.enter="fetchSearchQuery"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/search-box';
</style>
