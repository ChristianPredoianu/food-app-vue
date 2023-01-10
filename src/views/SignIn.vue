<script setup>
import SignInForm from '@/components/forms/SignInForm.vue';
</script>

<template>
  <main class="main container">
    <div class="sign-in-container">
      <img
        src="@/assets/food-plate.jpg"
        alt="food"
        class="sign-in-container__img"
      />
      <div class="form-container">
        <SignInForm />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/sass/views/sign-in';
</style>
