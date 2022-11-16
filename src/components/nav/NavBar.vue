<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isNavOpen = ref(false);
const isMobileView = ref(true);

function toggleNav() {
  isNavOpen.value = !isNavOpen.value;
}

function handleView() {
  isMobileView.value = window.innerWidth < 640;
  isMobileView.value ? (isNavOpen.value = false) : (isNavOpen.value = true);
}

onMounted(() => {
  handleView();
  window.addEventListener('resize', handleView);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleView);
});
</script>

<template>
  <header class="header">
    <nav class="nav container">
      <p class="logo">Foo<span class="logo__span">die</span></p>
      <ul class="nav-links" v-if="isNavOpen">
        <li class="nav-links__item">
          <font-awesome-icon icon="search" />Search
        </li>
        <li class="nav-links__item">
          <font-awesome-icon icon="fa-regular fa-heart" />Favorite
        </li>
        <li class="nav-links__item nav-links__item--btn-transparent">Login</li>
        <li class="nav-links__item nav-links__item--btn-green">Sign up</li>
      </ul>
      <div class="hamburger" :class="{ active: isNavOpen }" @click="toggleNav">
        <span class="hamburger__bar"></span>
        <span class="hamburger__bar"></span>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@/sass/components/nav/nav-bar';
</style>
