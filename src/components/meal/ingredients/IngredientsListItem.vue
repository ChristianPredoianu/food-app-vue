<script setup>
const props = defineProps({
  mealIngredients: Array,
});
</script>

<template>
  <li v-for="ingredient in mealIngredients" :key="ingredient.image">
    <div class="ingredients-item">
      <img
        :src="ingredient.image"
        :alt="ingredient.text"
        class="ingredients-item__img"
      />
      <p class="ingredients-item__text">
        {{ ingredient.text }}
      </p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/ingredients/ingredients-list-item';
</style>
