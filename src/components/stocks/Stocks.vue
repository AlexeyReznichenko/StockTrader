<template>
  <div class="stocks">
      <app-stock v-for="(stock, index) in this.$store.state.stocks" :key="stock" :stock='stock'
       :index='index'></app-stock>
  </div>
</template>

<script>
import Stock from './Stock'

export default {
  components: {
    'app-stock': Stock
  },
}
</script>

<style lang='scss' scoped>
  .stocks {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>