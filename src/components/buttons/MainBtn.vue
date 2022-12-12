<script setup>
const emit = defineEmits(['handleClick']);

function onHandleClick() {
  emit('handleClick');
}
</script>

<template>
  <button class="main-btn" @click="onHandleClick"><slot></slot></button>
</template>

<style lang="scss" scoped>
@use '@/sass/components/buttons/main-btn';
</style>
