<script setup>
import MainBtn from '@/components/buttons/MainBtn.vue';

const props = defineProps({
  meal: Object,
});

const emit = defineEmits(['goToDetails']);

function onGoToDetails() {
  emit('goToDetails');
}
</script>

<template>
  <div class="meal-card">
    <img :src="meal.recipe.image" alt="meal" class="meal-card__img" />
    <h3 class="meal-card__heading">{{ meal.recipe.label }}</h3>
    <div class="meal-card-cta">
      <font-awesome-icon icon="fa-regular fa-heart" class="meal-card__icon" />
      <MainBtn @handleClick="onGoToDetails">Details</MainBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/cards/meal-card';
</style>
