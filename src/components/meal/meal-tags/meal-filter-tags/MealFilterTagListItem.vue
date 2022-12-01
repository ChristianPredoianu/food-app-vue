<script setup>
import { useCapitalizeFirstLetter } from '@/composables/useCapitalizeFirstLetter';

const props = defineProps({
  dishTags: Array,
});

const emit = defineEmits(['removeTag']);

function onRemoveTag(tag) {
  emit('removeTag', tag);
}

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();
</script>

<template>
  <li
    class="meal-tag-list-item"
    v-for="tag in dishTags"
    @click="onRemoveTag(tag)"
  >
    {{ capitalizeFirstLetter(tag) }}

    <font-awesome-icon icon="xmark" class="meal-tag-list-item__remove" />
  </li>
</template>

<style lang="scss" scoped>
@use '@/sass/components/meal/meal-tags/meal-filter-tags/meal-filter-tag-list-item';
</style>
