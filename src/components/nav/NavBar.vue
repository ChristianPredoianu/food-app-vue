<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useQueryUrl } from '@/composables/useQueryUrl';
import { useFetch } from '@/composables/useFetch';

const isNavOpen = ref(false);
const isMobileView = ref(true);
const isSearchOpen = ref(false);
const searchQuery = ref(null);

const emit = defineEmits(['queryMeals']);

function onQueryMeals(mealsData) {
  emit('queryMeals', mealsData);
}

function toggleNav() {
  isNavOpen.value = !isNavOpen.value;
}

function handleView() {
  isMobileView.value = window.innerWidth < 640;
  isMobileView.value ? (isNavOpen.value = false) : (isNavOpen.value = true);
}

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value;
}

function closeSearch() {
  isSearchOpen.value = false;
  console.log('closing');
}

async function searchMeals() {
  const { searchQueryUrl } = useQueryUrl(searchQuery.value);
  const { data } = await useFetch(searchQueryUrl);

  onQueryMeals(data.value);
  closeSearch();
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
        <li class="nav-links__item" v-if="!isMobileView">
          <div class="search-container">
            <Transition name="slide-fade">
              <input
                type="text"
                class="search-input"
                placeholder="Search meals.."
                @keyup.enter="searchMeals"
                v-model="searchQuery"
                v-if="isSearchOpen"
            /></Transition>
            <font-awesome-icon
              icon="search"
              class="search-icon"
              @click="toggleSearch"
            />
          </div>
          <p @click="toggleSearch">Search</p>
        </li>

        <!--   <li class="nav-links__item" v-if="!isMobileView">
          <font-awesome-icon icon="fa-regular fa-heart" />Favorite
        </li> -->
        <div class="cta-btns">
          <li class="nav-links__item nav-links__item--btn-transparent">
            Login
          </li>
          <li class="nav-links__item nav-links__item--btn-green">Sign up</li>
        </div>
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
