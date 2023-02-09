<script setup>
import ModalOverlay from '@/components/modal/ModalOverlay.vue';

const emit = defineEmits(['closeModal', 'filteredData', 'dishTags']);

function onCloseModal() {
  emit('closeModal');
}

function onFilteredData(mealsData) {
  emit('filteredData', mealsData);
}

function onEmitDishTags(dishTags) {
  emit('dishTags', dishTags);
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
          @dishTags="onEmitDishTags"
        />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal';
</style>
