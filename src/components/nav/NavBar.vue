<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInitialMealsUrl } from '@/composables/url/useInitialMealsUrl';
import { useQueryUrl } from '@/composables/url/useQueryUrl';
import { useFetch } from '@/composables/useFetch';
import { getAuth, signOut } from 'firebase/auth';

const emit = defineEmits(['queryMeals', 'isQuerying']);

const auth = getAuth();

const isNavOpen = ref(false);
const isMobileView = ref(true);
const isSearchOpen = ref(false);
const searchQuery = ref(null);
const currentUser = ref(auth.currentUser);
const isQuerying = ref(false);

const router = useRouter();
const { initialMealsUrl } = useInitialMealsUrl();
const { queryUrl } = useQueryUrl();
const { data, fetchData } = useFetch();

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

async function fetchQueriedMeals() {
  isQuerying.value = true;

  if (searchQuery.value !== null && searchQuery.value !== '') {
    const url = queryUrl(searchQuery.value);
    await fetchData(url);

    onQueryMeals(data.value);
    onIsQuerying();
    closeSearch();
  }
  if (searchQuery.value === '') {
    fetchInititalMeals();
  }
}

async function fetchInititalMeals() {
  isQuerying.value = false;

  await fetchData(initialMealsUrl.value);

  onIsQuerying();
  onQueryMeals(data.value);
}

function signUserOut() {
  signOut(auth);
  closeNav();
  router.push({ name: 'SignIn' });
  localStorage.clear();
}

function onQueryMeals(mealsData) {
  emit('queryMeals', mealsData);
}

function onIsQuerying() {
  emit('isQuerying', isQuerying);
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
      <RouterLink to="/">
        <p class="logo">Foo<span class="logo__span">die</span></p>
      </RouterLink>
      <ul class="nav-links" v-if="isNavOpen">
        <li v-if="currentUser !== null && !isMobileView" class="welcome">
          <p class="welcome__text">Welcome</p>
          <p class="welcome__name">{{ currentUser.displayName }}</p>
        </li>
        <li class="nav-links__item" v-if="!isMobileView">
          <div class="search-container">
            <Transition name="slide-fade">
              <input
                type="text"
                class="search-input"
                placeholder="Search meals.."
                @keyup.enter="fetchQueriedMeals"
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
        <RouterLink to="/admin">
          <li class="nav-links__item">
            <font-awesome-icon
              icon="fa-regular fa-heart"
              v-if="!isMobileView"
            />Favorites
          </li>
        </RouterLink>
        <RouterLink to="/signin">
          <li
            class="nav-links__item nav-links__item--btn-transparent"
            v-if="!currentUser"
            @click="closeNav"
          >
            Login
          </li>
        </RouterLink>
        <RouterLink to="/signup"
          ><li
            class="nav-links__item nav-links__item--btn-green"
            @click="closeNav"
            v-if="!currentUser"
          >
            Sign Up
          </li>
        </RouterLink>
        <li
          class="nav-links__item nav-links__item--btn-green"
          @click="signUserOut"
          v-if="currentUser"
        >
          Sign Out
        </li>
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
