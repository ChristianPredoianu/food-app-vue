<script setup>
const props = defineProps({
  mealTags: Array,
});
</script>

<template>
  <li class="meal-tag-item" v-for="mealTag in mealTags"># {{ mealTag }}</li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-tag-item';
</style>
