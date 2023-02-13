<script setup>
import ModalOverlay from '@/components/modal/ModalOverlay.vue';

const props = defineProps({
  selectedOptions: Object,
});

const emit = defineEmits(['closeModal', 'filteredData']);

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}
</script>

<template>
  <div>
    <teleport to="#overlay-root">
      <div class="modal">
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          class="close-icon"
          @click="onCloseModal"
        />
        <ModalOverlay
          @closeModal="onCloseModal"
          @filteredData="onFilteredData"
          :selectedOptions="selectedOptions"
        />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal';
</style>
