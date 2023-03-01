<script setup>
/* There is a aws token set on the image url when fetching recipe image from edamam Api that expires
after a short period of time, setting that image to firebase database when adding favorite recipe
and fetching the data from firebase at a later point will result in the image token being expired
hence resulting in a 403 error. I'm using the edamam logo insted as a card image when fetching
recipes from firebase */

import { ref, computed, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { useExtractIdFromUri } from '@/composables/url/useExtractIdFromUri';
import { useCapitalizeFirstLetter } from '@/composables/helpers/useCapitalizeFirstLetter';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, remove, set } from 'firebase/database';

import MainBtn from '@/components/buttons/MainBtn.vue';

const props = defineProps({
  meal: Object,
});

const emit = defineEmits(['goToDetails']);

const firstThreeDigestValues = computed(() =>
  props.meal.recipe.digest.slice(0, 3)
);

const db = getDatabase();
const auth = getAuth();
const currentUser = ref(auth.currentUser);

const router = useRouter();
const { extractIdFromUri } = useExtractIdFromUri();
const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const isFavoriteMeal = ref(
  localStorage.getItem(extractIdFromUri(props.meal.recipe.uri))
);

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
  <article class="meal-card">
    <img
      :src="meal.recipe.image"
      alt="meal"
      class="meal-card__img"
      v-if="props.meal.recipe.image"
    />
    <img
      src="@/assets/Edamam_Badge_Transparent.svg"
      alt="meal"
      class="meal-card__edamam-logo"
      v-else
    />
    <h3
      :class="
        props.meal.recipe.image
          ? 'meal-card__heading'
          : 'meal-card__heading-edamam-logo'
      "
    >
      {{ meal.recipe.label }}
    </h3>
    <h4 class="meal-card__dish-type" v-if="!props.meal.recipe.image">
      {{ capitalizeFirstLetter(props.meal.recipe.dishType[0]) }}
    </h4>
    <div class="meal-card-cta">
      <font-awesome-icon
        icon="fa-regular fa-heart"
        class="meal-card__icon"
        :class="isFavoriteMeal ? 'favorite-meal-active' : ''"
        @click="addFavoriteMealToDb"
      />
      <MainBtn @handleClick="onGoToDetails">Details</MainBtn>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@/sass/components/cards/meal-card';
</style>
