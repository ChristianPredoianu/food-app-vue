<script setup>
import MealFilterTagListItem from '@/components/meal/meal-tags/meal-filter-tags/MealFilterTagListItem.vue';

const props = defineProps({
  dishTags: [Array, Object],
});

const emit = defineEmits(['removeTag']);

function onRemoveTag(tag) {
  emit('removeTag', tag);
}
</script>

<template>
  <ul class="meal-tag-list">
    <MealFilterTagListItem :dishTags="dishTags" @removeTag="onRemoveTag" />
  </ul>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-filter-tags/meal-filter-tag-list';
</style>
