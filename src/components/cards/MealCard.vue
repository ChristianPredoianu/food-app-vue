<script setup>
import { ref } from 'vue';
import MainBtn from '@/components/buttons/MainBtn.vue';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const props = defineProps({
  meal: Object,
});

const emit = defineEmits(['goToDetails']);

const auth = getAuth();

const isFavoriteMeal = ref(false);
const currentUser = ref(auth.currentUser);

function onGoToDetails() {
  emit('goToDetails');
}

function addMealToFavorites(meal) {
  const db = getDatabase();
  const mealsListRef = dbRef(db, 'meals');
  /*   const newMealRef = push(mealsListRef);
  isFavoriteMeal.value = !isFavoriteMeal.value; */

  set(dbRef(db, 'users/' + currentUser.value.uid), {
    test: meal,
  });
  console.log(meal.recipe);
  console.log(currentUser.value.uid);
}
</script>

<template>
  <div class="meal-card">
    <img :src="meal.recipe.image" alt="meal" class="meal-card__img" />
    <h3 class="meal-card__heading">{{ meal.recipe.label }}</h3>
    <div class="meal-card-cta">
      <font-awesome-icon
        icon="fa-regular fa-heart"
        class="meal-card__icon"
        :class="isFavoriteMeal ? 'favorite-meal-active' : ''"
        @click="addMealToFavorites(meal)"
      />
      <MainBtn @handleClick="onGoToDetails">Details</MainBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/cards/meal-card';
</style>
