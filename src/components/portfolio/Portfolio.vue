<template>
  <div class="stocks">
      <app-stock v-for="(stockPortfolio, index) in this.$store.state.portfolio" :key="stockPortfolio"
       :stockPortfolio='stockPortfolio' :index='index'></app-stock>
  </div>
</template>

<script>
import Stock from './PortfolioStock'

export default {
  components: {
    'app-stock': Stock
  },
}
</script>

<style lang='scss' scoped>
  .stocks {
    @include stocksGrid;
  }
</style>