<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useExtractIdFromUri } from '@/composables/useExtractIdFromUri';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

import MealCard from '@/components/cards/MealCard.vue';

const db = getDatabase();
const auth = getAuth();
const router = useRouter();
const { extractIdFromUri } = useExtractIdFromUri();

const currentUser = ref(auth.currentUser);
const userFavoriteMeals = ref(null);

function goToMealDetails(meal) {
  router.push({
    name: 'MealDetails',
    params: {
      id: extractIdFromUri(meal.recipe.uri),
    },
  });
}

onBeforeMount(() => {
  console.log('mounted');
  const mealsListRef = dbRef(
    db,
    `users/ ${currentUser.value.uid}/favoriteMeals`
  );

  onValue(mealsListRef, (snapshot) => {
    const data = snapshot.val();
    userFavoriteMeals.value = data;
    console.log(userFavoriteMeals.value);
  });
});
</script>

<template>
  <main class="main container">
    <h1 class="heading-primary">
      {{
        userFavoriteMeals !== null
          ? 'Your favorite recepies:'
          : 'You have no recepies as favorite'
      }}
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
