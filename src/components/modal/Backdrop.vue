<script setup>
const emit = defineEmits(['closeModall']);

function onCloseModal() {
  emit('closeModall');
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
