<template>
  <div class="body">
    <app-header></app-header>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
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

  .slide-fade-enter {
    opacity: 0;
  }

  .slide-fade-enter-active {
    animation: slide-in .2s ease-out forwards;
    transition: opacity .2s;
  }

  .slide-fade-leave-active {
    animation: slide-out .2s ease-out forwards;
    transition: opacity .2s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-2rem);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-2rem);
    }
  }
</style>
