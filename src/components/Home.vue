<template>
  <div class="home">
      <h1 class="heading-primary">Trade or View your Portfolio</h1>
      <p class="home__paragraph">You may Save & Load your Data</p>
      <p class="home__paragraph">Click on 'End Day' to begin a new Day</p>
      <h3 class="heading-tertiary">Your Funds: ${{this.$store.state.funds}}</h3>
  </div>
</template>

<style lang='scss'>
  .home {
    padding: 1.5rem;
    border: 1px solid #bdbdbd;
    border-radius: .5rem;

    &__paragraph {
      margin: 0;
      margin-bottom: .75rem;
      font-size: 1.3rem;
      font-weight: 600;

      &:last-of-type {
        padding-bottom: 2rem;
        border-bottom: 1px solid #e2dfdf;
      }
    }

    .heading-primary {
      margin-bottom: 1rem;
    }
  }
</style>