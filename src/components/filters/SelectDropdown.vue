<script setup>
import { ref } from 'vue';

import { useCapitalizeFirstLetter } from '@/composables/useCapitalizeFirstLetter';

const props = defineProps({
  meals: Array,
  index: String,
});

const selectedDishType = ref('');

const emit = defineEmits(['emitValue']);

function onEmitValue(selected) {
  emit('emitValue', selected, props.index);
  selectedDishType.value = '';
}

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();
</script>

<template>
  <div class="select-container">
    <label class="select-container__label" for="dish">{{
      capitalizeFirstLetter(index.split('Type')[0])
    }}</label>
    <select
      class="select-container__select"
      name="cuisine"
      @change="onEmitValue(selectedDishType, index)"
      v-model="selectedDishType"
    >
      <option v-for="mealType in meals" :key="mealType" :value="mealType">
        {{ capitalizeFirstLetter(mealType) }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/filters/select-dropdown';
</style>
