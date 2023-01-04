<script setup>
import SignUpForm from '@/components/forms/SignUpForm.vue';
</script>

<template>
  <main class="sign-up-container container">
    <img
      src="@/assets/dose-juice.jpg"
      alt="food"
      class="sign-up-container__img"
    />
    <div class="form-container">
      <SignUpForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/sass/views/sign-up';
</style>
