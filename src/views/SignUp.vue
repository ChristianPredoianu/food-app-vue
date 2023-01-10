<script setup>
import SignUpForm from '@/components/forms/SignUpForm.vue';
</script>

<template>
  <main class="main container">
    <div class="sign-up-container">
      <img
        src="@/assets/food-plate.jpg"
        alt="food"
        class="sign-up-container__img"
      />
      <div class="form-container">
        <SignUpForm />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/sass/views/sign-up';
</style>
