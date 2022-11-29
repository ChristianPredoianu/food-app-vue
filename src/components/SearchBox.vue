<script setup>
const emit = defineEmits(['openModal']);

function onOpenModal() {
  emit('openModal');
}
</script>

<template>
  <div class="search-box">
    <h1 class="search-box__heading">What would you like to cook?</h1>
    <div class="input-container">
      <button class="filter-btn" @click="onOpenModal">Filter</button>
      <font-awesome-icon icon="search" class="input-icon" />
      <input
        class="input-field"
        type="text"
        placeholder="Recepies, ingredients"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/sass/components/search-box';
</style>
