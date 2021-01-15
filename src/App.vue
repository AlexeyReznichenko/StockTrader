<template>
  <div class="body">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style lang="scss">
  .body {
    margin: 3rem 6.5rem;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
