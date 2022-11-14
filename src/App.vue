<script setup>
import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';

const layout = shallowRef(null);
const route = useRoute();

watch(route, () => {
  route.meta.layout !== undefined
    ? (layout.value = route.meta.layout)
    : (layout.value = BaseLayout); // this is default layout if route meta is not set;
});
</script>

<template>
  <component :is="layout" />
</template>

<style scoped></style>
