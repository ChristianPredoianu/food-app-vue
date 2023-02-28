<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from '@/components/nav/NavBar.vue';
import Footer from '@/components/Footer.vue';

const emit = defineEmits(['queryMeals', 'isFiltering']);

const route = useRoute();

const queriedMealsData = ref(null);
const isQuerying = ref(null);

// Pass the queriedMealsData only to Home view
const queriedMealDataProp = computed(() => {
  const mealsData = route.name === 'Home' ? queriedMealsData.value : undefined;
  return mealsData;
});

const isQueryingProp = computed(() => {
  const isQueryingMeals = route.name === 'Home' ? isQuerying.value : undefined;
  return isQueryingMeals;
});

function setMealsData(mealsData) {
  queriedMealsData.value = mealsData;
}

function setIsQuerying(isFiltering) {
  isQuerying.value = isFiltering.value;
}
</script>

<template>
  <div>
    <NavBar
      :key="route.fullPath"
      @queryMeals="setMealsData"
      @isQuerying="setIsQuerying"
    />
    <router-view
      :queriedMealData="queriedMealDataProp"
      :isNavFiltering="isQueryingProp"
    />
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
