<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/nav/NavBar.vue';

const emit = defineEmits(['queryMeals', 'isFiltering']);

const route = useRoute();

const queriedMealsData = ref(null);
const isUserFiltering = ref(null);

// Pass the queriedMealsData only to Home view
const queriedMealDataProp = computed(() => {
  const mealsData = route.name === 'Home' ? queriedMealsData.value : undefined;
  return mealsData;
});

const isFilteringProp = computed(() => {
  const isFilteringMeals =
    route.name === 'Home' ? isUserFiltering.value : undefined;
  return isFilteringMeals;
});

function setMealsData(mealsData) {
  queriedMealsData.value = mealsData;
}

function setIsFiltering(isFiltering) {
  isUserFiltering.value = isFiltering.value;
}
</script>

<template>
  <div>
    <NavBar
      :key="route.fullPath"
      @queryMeals="setMealsData"
      @isFiltering="setIsFiltering"
    />
    <router-view
      :queriedMealData="queriedMealDataProp"
      :isNavFiltering="isFilteringProp"
    />
  </div>
</template>

<style lang="scss" scoped></style>
