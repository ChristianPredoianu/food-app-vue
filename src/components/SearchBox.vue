<script setup>
import { ref, watch } from 'vue';
import { useQueryUrl } from '@/composables/url/useQueryUrl';
import { useFetch } from '@/composables/useFetch';

const emit = defineEmits([
  'openModal',
  'queryMeals',
  'isSearching',
  'fetchInitialMeals',
]);

const searchQuery = ref(null);
const isSearching = ref(false);

const { queryUrl } = useQueryUrl();
const { data, fetchData } = useFetch();

function onOpenModal() {
  emit('openModal');
}

function onQueryMeals(mealsData) {
  emit('queryMeals', mealsData);
}

function onSearching() {
  emit('isSearching', isSearching);
}

async function fetchSearchQuery() {
  isSearching.value = true;

  if (searchQuery.value !== null) {
    const url = queryUrl(searchQuery.value);
    await fetchData(url);

    isSearching.value = false;

    onQueryMeals(data.value);
  }

  if (searchQuery.value === '') {
    onFetchInitialMeals();
  }
}

function onFetchInitialMeals() {
  emit('fetchInitialMeals');
}

watch(
  () => isSearching.value,
  () => {
    onSearching();
  }
);
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
