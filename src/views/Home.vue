<script setup>
import { onBeforeMount, ref } from 'vue';
import { useFetch } from '@/composables/useFetch';

const jokes = ref(null);
const isLoadingJokes = ref(true);
const isFetchError = ref(false);

onBeforeMount(async () => {
  const { data, isLoading } = await useFetch(
    'https://api.chucknorris.io/jokes/random'
  );

  jokes.value = data.value;
  isLoadingJokes.value = isLoading.value;
});
</script>

<template></template>

<style lang="scss" scoped></style>
