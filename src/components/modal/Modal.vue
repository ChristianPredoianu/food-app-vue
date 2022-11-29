<script setup>
import ModalOverlayVue from '@/components/modal/ModalOverlay.vue';
</script>

<template>
  <teleport to="#overlay-root">
    <div class="modal">
      <ModalOverlayVue />
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/modal';
</style>
