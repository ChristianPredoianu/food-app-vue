<script setup>
const props = defineProps({
  mealTags: Array,
});
</script>

<template>
  <li class="meal-tag-item" v-for="mealTag in mealTags" :key="mealTag">
    # {{ mealTag }}
  </li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-tag-list-item';
</style>
