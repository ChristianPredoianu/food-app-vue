<script setup>
import { ref, computed, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { useExtractIdFromUri } from '@/composables/url/useExtractIdFromUri';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, remove, set } from 'firebase/database';

import MainBtn from '@/components/buttons/MainBtn.vue';

const props = defineProps({
  meal: Object,
});

const emit = defineEmits(['goToDetails']);

const auth = getAuth();
const router = useRouter();
const { extractIdFromUri } = useExtractIdFromUri();

const isFavoriteMeal = ref(
  localStorage.getItem(extractIdFromUri(props.meal.recipe.uri))
);
const currentUser = ref(auth.currentUser);

const firstThreeDigestValues = computed(() =>
  props.meal.recipe.digest.slice(0, 3)
);

const db = getDatabase();

function onGoToDetails() {
  emit('goToDetails');
}

function addFavoriteMealToDb() {
  isFavoriteMeal.value = !isFavoriteMeal.value;

  if (currentUser.value === null) {
    router.push({ name: 'SignIn' });
  } else if (isFavoriteMeal.value) {
    const mealToAddToDb = {
      recipe: {
        uri: extractIdFromUri(props.meal.recipe.uri),
        label: props.meal.recipe.label,
        dishType: props.meal.recipe.mealType,
        digest: firstThreeDigestValues.value,
        image: props.meal.recipe.image,
        ingredients: props.meal.recipe.ingredientLines,
        nutrients: props.meal.recipe.totalDaily,
      },
    };

    const mealsListRef = dbRef(
      db,
      `users/ ${currentUser.value.uid}/favoriteMeals/${extractIdFromUri(
        props.meal.recipe.uri
      )}`
    );

    set(mealsListRef, mealToAddToDb);
    localStorage.setItem(extractIdFromUri(props.meal.recipe.uri), 'true');
  } else {
    removeFavoriteMealFromDb();
  }
}

function removeFavoriteMealFromDb() {
  if (currentUser.value !== null) {
    localStorage.removeItem(extractIdFromUri(props.meal.recipe.uri));
    const mealsListRef = dbRef(
      db,
      `users/ ${currentUser.value.uid}/favoriteMeals/${extractIdFromUri(
        props.meal.recipe.uri
      )}`
    );
    remove(mealsListRef);
  }
}

onUpdated(() => {
  isFavoriteMeal.value = localStorage.getItem(
    extractIdFromUri(props.meal.recipe.uri)
  );
});
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
