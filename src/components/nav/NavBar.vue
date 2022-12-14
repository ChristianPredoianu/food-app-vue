<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQueryUrl } from '@/composables/useQueryUrl';
import { useFetch } from '@/composables/useFetch';

const emit = defineEmits(['queryMeals']);

const isNavOpen = ref(false);
const isMobileView = ref(true);
const isSearchOpen = ref(false);
const searchQuery = ref('');

const router = useRouter();

function onQueryMeals(mealsData) {
  emit('queryMeals', mealsData);
}

function toggleNav() {
  isNavOpen.value = !isNavOpen.value;
}

function setNavState() {
  isMobileView.value ? (isNavOpen.value = false) : (isNavOpen.value = true);
}

function closeNav() {
  setNavState();
}

function handleView() {
  isMobileView.value = window.innerWidth < 640;
  setNavState();
}

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value;
}

function closeSearch() {
  isSearchOpen.value = false;
}

async function searchMeals() {
  const { searchQueryUrl } = useQueryUrl(searchQuery.value);
  const { data } = await useFetch(searchQueryUrl);

  onQueryMeals(data.value);
  closeSearch();
  searchQuery.value = '';
  router.push({ name: 'Home' });
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
      <RouterLink to="/"
        ><p class="logo">Foo<span class="logo__span">die</span></p></RouterLink
      >
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
          <RouterLink to="/signin"
            ><li
              class="nav-links__item nav-links__item--btn-transparent"
              @click="closeNav"
            >
              Login
            </li></RouterLink
          >
          <RouterLink to="/signup"
            ><li
              class="nav-links__item nav-links__item--btn-green"
              @click="closeNav"
            >
              Sign up
            </li></RouterLink
          >
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
