<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useExtractIdFromUri } from '@/composables/url/useExtractIdFromUri';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

import MealCard from '@/components/cards/MealCard.vue';

const db = getDatabase();
const auth = getAuth();
const router = useRouter();
const { extractIdFromUri } = useExtractIdFromUri();

const currentUser = ref(auth.currentUser);
const userFavoriteMeals = ref(null);
const isDataLoaded = ref(false);

function getMealsFromDb() {
  const mealsListRef = dbRef(
    db,
    `users/ ${currentUser.value.uid}/favoriteMeals`
  );

  onValue(mealsListRef, (snapshot) => {
    const data = snapshot.val();
    userFavoriteMeals.value = data;
    isDataLoaded.value = true;

    setFavoriteMealsToLocalStorage();
  });
}

function setFavoriteMealsToLocalStorage() {
  if (userFavoriteMeals.value !== null) {
    const ids = Object.keys(userFavoriteMeals.value);

    for (let i = 0; i < ids.length; i++) {
      localStorage.setItem(ids[i], true);
    }
  }
}

function goToMealDetails(meal) {
  router.push({
    name: 'MealDetails',
    params: {
      id: extractIdFromUri(meal.recipe.uri),
    },
  });
}

onBeforeMount(() => {
  getMealsFromDb();
});
</script>

<template>
  <main class="main container">
    <h1
      class="heading-primary"
      v-if="userFavoriteMeals === null && isDataLoaded"
    >
      {{ 'You have no favorite recepies yet' }}
    </h1>
    <h1
      class="heading-primary"
      v-if="userFavoriteMeals !== null && isDataLoaded"
    >
      {{ 'Your favorite recepies:' }}
    </h1>
    <div class="meal-cards">
      <MealCard
        v-for="meal in userFavoriteMeals"
        :key="meal.mealImage"
        :meal="meal"
        @goToDetails="goToMealDetails(meal)"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/sass/views/admin';
</style>
