<script setup>
import { reactive } from 'vue';
import { useAuthForm } from '@/composables/auth/useAuthForm';
import { useFirebaseAuth } from '@/composables/auth/useFirebaseAuth';

import AuthCard from '@/components/cards/AuthCard.vue';
import AuthSubmitBtn from '@/components/buttons/AuthSubmitBtn.vue';

const state = reactive({
  email: '',
  password: '',
  isInputValid: false,
  errors: [],
});

const { isEmailValid, isPasswordValid } = useAuthForm(state);
const { signUserIn, signInError } = useFirebaseAuth(state);

function validateSignIn(e) {
  e.preventDefault();

  state.errors = [];

  if (!isEmailValid()) state.errors.push('Wrong email format');

  if (!isPasswordValid())
    state.errors.push('Password must be at least 6 charachers long');

  if (!state.errors.length) {
    state.isInputValid = true;
    signUserIn();
  }
}
</script>

<template>
  <AuthCard>
    <h1 class="sign-in-heading">Sign In</h1>
    <form class="sign-in-form" @submit="validateSignIn">
      <label for="email" class="sign-up-form__label">Email</label>
      <input
        type="text"
        class="sign-in-form__input"
        :class="[isEmailValid() || state.isInputValid ? 'validated' : '']"
        required
        v-model="state.email"
        @keypress="validateEmail"
      />
      <label for="password" class="sign-up-form__label">Password</label>
      <input
        type="password"
        class="sign-in-form__input"
        :class="[isPasswordValid() || state.isInputValid ? 'validated' : '']"
        required
        autocomplete="on"
        v-model="state.password"
        @keypress="validatePassword"
      />
      <ul>
        <li class="invalid-message" v-for="error in state.errors" :key="error">
          {{ error }}
        </li>
      </ul>
      <p class="sign-up-paragraph">
        Not a member? Sign up
        <RouterLink to="/signup"
          ><span class="sign-up-paragraph__span">here...</span></RouterLink
        >
      </p>
      <AuthSubmitBtn>Sign Up</AuthSubmitBtn>
      <p class="auth-error">{{ signInError }}</p>
    </form>
  </AuthCard>
</template>

<style lang="scss" scoped>
@use '@/sass/components/forms/sign-in-form';
</style>
