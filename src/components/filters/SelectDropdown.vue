<script setup>
import { ref } from 'vue';
import { useCapitalizeFirstLetter } from '@/composables/helpers/useCapitalizeFirstLetter';

const props = defineProps({
  meals: Array,
  index: String,
});

const emit = defineEmits(['emitValue']);

const selectedDishType = ref('');

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

function onEmitValue(selected) {
  emit('emitValue', selected, props.index);
  selectedDishType.value = '';
}
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
