<script setup>
import ModalOverlay from '@/components/modal/ModalOverlay.vue';

const props = defineProps({
  selectedOptions: Object,
});

const emit = defineEmits(['closeModal', 'filteredData', 'isFiltering']);

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}

function onIsFiltering(isFiltering) {
  emit('isFiltering', isFiltering);
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
          :selectedOptions="selectedOptions"
          @closeModal="onCloseModal"
          @filteredData="onFilteredData"
          git
        />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal';
</style>
