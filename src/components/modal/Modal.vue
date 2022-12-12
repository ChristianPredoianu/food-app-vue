<script setup>
import ModalOverlay from '@/components/modal/ModalOverlay.vue';

const emit = defineEmits(['closeModal']);

function test() {
  emit('closeModal');
  console.log('emmiting from modal');
}
</script>

<template>
  <div>
    <teleport to="#overlay-root">
      <div class="modal">
        <ModalOverlay @onCloseModal="test" />
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal';
</style>
