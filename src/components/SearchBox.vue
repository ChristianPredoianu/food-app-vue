<script setup>
import { ref } from 'vue';
import { useQueryUrl } from '@/composables/useQueryUrl';
import { useFetch } from '@/composables/useFetch';

const emit = defineEmits(['openModal', 'queryMeals']);

const searchQuery = ref(null);

function onOpenModal() {
  emit('openModal');
}

function onQueryMeals(mealsData) {
  emit('queryMeals', mealsData);
}

async function fetchSearchQuery() {
  const { searchQueryUrl } = useQueryUrl(searchQuery.value);
  const { data } = await useFetch(searchQueryUrl);

  onQueryMeals(data.value);
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
