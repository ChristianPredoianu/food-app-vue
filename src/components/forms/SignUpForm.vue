<script setup>
import { reactive } from 'vue';
import AuthCard from '@/components/cards/AuthCard.vue';
import AuthSubmitBtn from '@/components/buttons/AuthSubmitBtn.vue';
import { useAuthForm } from '@/composables/useAuthForm';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth';

const state = reactive({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  isInputValid: false,
  errors: [],
});

const {
  isUsernameValid,
  isEmailValid,
  isPasswordValid,
  isRepeatPasswordValid,
} = useAuthForm(state);

const { signUserUp, signUpError } = useFirebaseAuth(state);

console.log(signUpError.value);

function validateSignUp(e) {
  e.preventDefault();

  state.errors = [];

  if (!isUsernameValid()) {
    state.errors.push('Username must be at least 4 charachers long');
    state.isInputValid = false;
  }

  if (!isEmailValid()) state.errors.push('Wrong email format');

  if (!isPasswordValid())
    state.errors.push('Password must be at least 6 charachers long');

  if (!isRepeatPasswordValid())
    state.errors.push('Password and repeated password are not the same');

  if (!state.errors.length) {
    state.isInputValid = true;
    signUserUp();
  }
}
</script>

<template>
  <AuthCard>
    <h1 class="sign-up-heading">Sign Up</h1>
    <form class="sign-up-form" @submit="validateSignUp">
      <label for="username" class="sign-up-form__label">Username</label>
      <input
        type="text"
        class="sign-up-form__input"
        :class="[isUsernameValid() || state.isInputValid ? 'validated' : '']"
        required
        v-model="state.username"
        @keypress="validateUserName"
      />
      <label for="email" class="sign-up-form__label">Email</label>
      <input
        type="text"
        class="sign-up-form__input"
        :class="[isEmailValid() || state.isInputValid ? 'validated' : '']"
        required
        v-model="state.email"
        @keypress="validateEmail"
      />
      <label for="password" class="sign-up-form__label">Password</label>
      <input
        type="password"
        class="sign-up-form__input"
        :class="[isPasswordValid() || state.isInputValid ? 'validated' : '']"
        required
        autocomplete="on"
        v-model="state.password"
        @keypress="validatePassword"
      />
      <label for="repeat-email" class="sign-up-form__label"
        >Repeat password</label
      >
      <input
        type="password"
        class="sign-up-form__input"
        :class="[
          isRepeatPasswordValid() || state.isInputValid ? 'validated' : '',
        ]"
        required
        autocomplete="on"
        v-model="state.repeatPassword"
        @keypress="validateRepeatPassword"
      />
      <ul>
        <li class="invalid-message" v-for="error in state.errors" :key="error">
          {{ error }}
        </li>
      </ul>
      <AuthSubmitBtn>Sign Up</AuthSubmitBtn>
    </form>
    <p class="auth-error">{{ signUpError }}</p>
  </AuthCard>
</template>

<style lang="scss" scoped>
@use '@/sass/components/forms/sign-up-form';
</style>
