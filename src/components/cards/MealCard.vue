<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainBtn from '@/components/buttons/MainBtn.vue';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, remove, set } from 'firebase/database';

const props = defineProps({
  meal: Object,
});

const emit = defineEmits(['goToDetails']);

const auth = getAuth();
const router = useRouter();

const isFavoriteMeal = ref(
  localStorage.getItem(extractIdFromUri(props.meal.recipe.uri))
);
const currentUser = ref(auth.currentUser);

const db = getDatabase();

const firstThreeDigestValues = computed(() =>
  props.meal.recipe.digest.slice(0, 3)
);

const dishToAddToDb = {
  id: extractIdFromUri(props.meal.recipe.uri),
  label: props.meal.recipe.label,
  dishType: props.meal.recipe.mealType,
  digest: firstThreeDigestValues.value,
  mealImage: props.meal.recipe.image,
  ingredients: props.meal.recipe.ingredientLines,
  nutrients: props.meal.recipe.totalDaily,
};

function onGoToDetails() {
  emit('goToDetails');
}

function extractIdFromUri(uri) {
  return uri.split('#recipe_').pop();
}

function addFavoriteMealToDb() {
  isFavoriteMeal.value = !isFavoriteMeal.value;
  console.log(isFavoriteMeal.value);
  if (currentUser.value === null) {
    router.push({ name: 'SignIn' });
  } else {
    const mealsListRef = dbRef(
      db,
      `users/ ${currentUser.value.uid}/favoriteMeals/${extractIdFromUri(
        props.meal.recipe.uri
      )}`
    );

    if (isFavoriteMeal.value) {
      set(mealsListRef, dishToAddToDb);
      localStorage.setItem(extractIdFromUri(props.meal.recipe.uri), 'true');
    } else {
      removeFavoriteMealFromDb();
    }
  }
}

function removeFavoriteMealFromDb() {
  if (currentUser.value !== null) {
    const mealsListRef = dbRef(
      db,
      `users/ ${currentUser.value.uid}/favoriteMeals/${extractIdFromUri(
        props.meal.recipe.uri
      )}`
    );
    remove(mealsListRef);
    localStorage.removeItem(extractIdFromUri(props.meal.recipe.uri));
  }
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
        @click="addFavoriteMealToDb"
      />
      <MainBtn @handleClick="onGoToDetails">Details</MainBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/cards/meal-card';
</style>
