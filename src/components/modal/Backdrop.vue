<script setup>
const emit = defineEmits(['closeModal']);

function onCloseModal() {
  emit('closeModal');
}
</script>

<template>
  <div>
    <teleport to="#backdrop-root">
      <div class="backdrop" @click="onCloseModal"></div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/modal/backdrop';
</style>
