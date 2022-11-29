<script setup>
import { ref } from 'vue';

import { useCapitalizeFirstLetter } from '@/composables/useCapitalizeFirstLetter';

const props = defineProps({
  meals: Array,
  index: String,
});

const selected = ref(null);

const emit = defineEmits(['emitValue']);

function onEmitValue(selected) {
  emit('emitValue', selected, props.index);
}

const { capitalizeFirstLetter } = useCapitalizeFirstLetter();
</script>

<template>
  <div class="select-container">
    <label for="dish">{{
      capitalizeFirstLetter(index.split('Type')[0])
    }}</label>
    <select
      class="select"
      name="cuisine"
      @change="onEmitValue(selected, index)"
      v-model="selected"
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
