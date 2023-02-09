<script setup></script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-logo">
        <RouterLink to="/">
          <p class="logo">Foo<span class="logo__span">die</span></p>
        </RouterLink>
      </div>
      <div class="horizontal-line"></div>
      <div class="social-media">
        <font-awesome-icon
          icon="fa-brands fa-instagram"
          class="social-media__icon social-media__icon--instagram"
        />
        <font-awesome-icon
          icon="fa-brands fa-facebook"
          class="social-media__icon social-media__icon--facebook"
        />
        <font-awesome-icon
          icon="fa-brands fa-youtube"
          class="social-media__icon social-media__icon--youtube"
        />
      </div>
      <img
        src="@/assets/Edamam_Badge_Transparent.svg"
        alt="edamam logo"
        class="edamam-logo"
      />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/sass/components/footer';
</style>
