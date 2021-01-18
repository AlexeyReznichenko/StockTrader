<template>
  <div class="stock">
      <div class="stock__top">
          <div class="stock__name">{{stockPortfolio.name}}</div>
          <div class="stock__info">(Price: {{stockPrice}} | Quantity: {{stockPortfolio.quantity}})</div>
      </div>
      <div class="stock__bottom">
          <input type="number" min="1" class="stock__quantity-input" placeholder="Quantity"
           @keydown='key({event: $event, input: inputParsed})' @keydown.enter="sellStocks" @click="selectStock" v-model="input">
          <button class="stock__sell-button" @click="sellStocks" :disabled='isDisable'>Sell</button>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    props: ['stockPortfolio', 'index'],
    data() {
        return {
            input: '',
            selectedIndex: -1,
            deadIndex: -1,
        }
    },
    methods: {
        ...mapActions([
            'key',
            'styleDisabledButtons'
        ]),

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        sellStocks() {
            if (this.inputParsed && typeof(this.inputParsed) == 'number') {
                let cost;
                const quantity = this.inputParsed;
                let foundElement = this.findStocksFromDatabase;

                if (foundElement >= 0 && this.$store.state.fetchData) {

                        let foundIndex = this.names.findIndex(el => el === this.portfolio[foundElement].name);
                        cost = quantity * this.prices[foundIndex];
                } else {
                    cost = quantity * this.portfolio[this.index].price;
                }


                if (this.portfolio[this.index].quantity >= quantity) {

                    console.log(cost);
                    this.portfolio[this.index].quantity -= quantity;
                    this.$store.state.funds += cost;
                    this.input = '';
                    document.querySelector('.stock__sell-button').style.backgroundColor = '#E38E8C';
                    
                    localStorage.setItem('funds', JSON.stringify(this.$store.state.funds));
                } else {
                    alert('You don\'t have enough stocks')
                }
                

                if (!this.portfolio[this.index].quantity) {

                    this.deadIndex = this.selectedIndex;

                    let check = false, indexOf;

                    this.portfolio.forEach((element, index) => {
                        let indexForEach = index
                        let foundForEach = this.names.find((el, i) => i === indexForEach && el === this.portfolio[this.deadIndex].name)
                        
                        if (foundForEach) {
                            indexOf = this.names.indexOf(foundForEach)
                            check = true
                        }
                    })
                    
                    if (check) {
                        this.names.splice(indexOf, 1);
                        this.prices.splice(indexOf, 1);
                    }

                    this.portfolio.splice(this.deadIndex, 1);
                }
                localStorage.setItem('portfolio', JSON.stringify(this.portfolio));
            }
        },

        

        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        selectStock(st) {
            this.selectedIndex = this.index;
        }
    },
    computed: {
        inputParsed() {
            return parseInt(this.input);
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        portfolio() {
            return this.$store.state.portfolio;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        names() {
            return this.$store.state.names;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        prices() {
            return this.$store.state.prices;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        findStocksFromDatabase() {
            let neededElement = [];

            this.names.forEach((el, i, arr) => {
                    this.portfolio.forEach((elem, index) => {
                    if (el === this.portfolio[index].name) {
                        neededElement.push(index);
                    } else {
                        let found = arr.findIndex(element => element === this.portfolio[index].name);
                        let foundArr = [];
                        let checkFound = foundArr.find((el, i) => i === found);

                        if (found >= 0 && found !== index && checkFound) {
                            neededElement.push(found);
                            foundArr.push(found);
                        }
                    }
                    })
            })

            let foundElement = neededElement.find((el) => el == this.index);

            return foundElement;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stockPrice() {
            let foundElement = this.findStocksFromDatabase;

            if (foundElement >= 0 && this.$store.state.fetchData) {

                let foundIndex = this.names.findIndex(el => el === this.portfolio[foundElement].name);
                return this.prices[foundIndex];
            } else {
                return this.stockPortfolio.price;
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        isDisable() {
            this.$store.dispatch('isDisable', 
            {btn: 'stock__sell-button', input: this.inputParsed, darkColor: '#D9524F',
             lightColor: '#E38E8C', index: this.selectedIndex});
        }
        
    },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    mounted() {
        this.styleDisabledButtons({btn: 'stock__sell-button', lightColor: '#E38E8C'});
    }
}
</script>

<style lang='scss' scoped>
    @include stock(#D7ECF5); 

    .hover:hover {
            background-color: darken(#D6534C, 10%) !important;
            cursor: pointer;
    }
</style>