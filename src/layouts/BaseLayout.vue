<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/nav/NavBar.vue';

const emit = defineEmits(['queryMeals']);

const route = useRoute();

const queriedMealsData = ref(null);

// Pass the queriedMealsData only to Home view
const propsToPass = computed(() => {
  const mealsData = route.name === 'Home' ? queriedMealsData.value : undefined;
  return mealsData;
});

function setMealsData(mealsData) {
  queriedMealsData.value = mealsData;
}
</script>

<template>
  <div>
    <NavBar @queryMeals="setMealsData" />

    <router-view :queriedMealData="propsToPass" />
  </div>
</template>

<style lang="scss" scoped></style>
