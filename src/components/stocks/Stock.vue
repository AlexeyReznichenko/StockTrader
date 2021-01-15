<template>
  <div class="stock">
      <div class="stock__top">
          <div class="stock__name">{{stock.name}}</div>
          <div class="stock__price">(Price: {{stock.price}})</div>
      </div>
      <div class="stock__bottom">
          <input type="number" min="1" class="stock__quantity-input" placeholder="Quantity" 
          @keydown='key({event: $event, input: inputParsed})' @keydown.enter="buyStocks" @click="selectStock" v-model="input">
          <button class="stock__buy-button" @click="buyStocks" :disabled='isDisable'>Buy</button>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    props: ['stock', 'index'],
    data() {
        return {
            input: '',
            selectedIndex: -1,
        }
    },
    methods: {
        ...mapActions([
            'key',
            'styleDisabledButtons',
        ]),
        buyStocks() {
            if (this.inputParsed && typeof(this.inputParsed) == 'number') {
                let indexOf, cost, portfolioMap, neededElement;

                if (this.portfolio.length > 0) {
                    this.portfolio.forEach((el, i, arr) => {
                        if (el.name === this.stocks[this.selectedIndex].name) {
                            neededElement = i;
                        }
                    });
                }

                if (neededElement || neededElement == 0) {
                    this.portfolio[parseInt(neededElement)].quantity += this.inputParsed;
                    cost = this.inputParsed * this.portfolio[parseInt(neededElement)].price;
                } else {
                    this.portfolio.push(this.stocks[this.selectedIndex]);
                    indexOf = this.portfolio.indexOf(this.stocks[this.selectedIndex]);
                    this.portfolio[indexOf].quantity = this.inputParsed;
                    cost = this.portfolio[indexOf].quantity * this.portfolio[indexOf].price;
                }

                    localStorage.setItem('portfolio', JSON.stringify(this.portfolio));

                if (this.$store.state.funds > cost) {
                    this.$store.state.funds -= cost;
                    this.input = '';
                    document.querySelector('.stock__buy-button').style.backgroundColor = '#94D096';
                    
                    localStorage.setItem('funds', JSON.stringify(this.$store.state.funds));
                } else {
                    alert('You don\'t have enough money');
                    console.log(cost)
                    console.log(this.portfolio)
                    document.querySelector('.stock__quantity-input').focus;
                }
            }
        },
        selectStock() {
            this.selectedIndex = this.index;
        }
    },
    computed: {
        inputParsed() {
            return parseInt(this.input);
        },
        portfolio() {
            return this.$store.state.portfolio;
        },
        stocks() {
            return this.$store.state.stocks;
        },
        isDisable() {
            this.$store.dispatch('isDisable', 
            {btn: 'stock__buy-button', input: this.inputParsed, darkColor: '#5DB75A',
             lightColor: '#94D096', index: this.selectedIndex});
        }
        
    },
    mounted() {
        this.styleDisabledButtons({btn: 'stock__buy-button', lightColor: '#94D096'});
    }
}
</script>

    <style lang='scss' scoped>
        .stock {
            border: 1px solid #e0dcdc;
            border-radius: .5rem;
            margin: 0rem 1.5rem 2rem;

            &__top {
                background-color: #DDEFD6;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
            }

            &__bottom {
                padding: 1.5rem;
                display: flex;
                justify-content: space-between;
            }

            &__name {
                color: #315535;
                font-size: 1.8rem;
                font-weight: 600;
                margin-right: 3px;
            }

            &__price {
                font-size: 1.1rem;
                margin-bottom: -3px;
            }

            &__quantity-input {
                padding: 1rem 1.5rem;
                border: 1px solid #afadad;
                border-radius: .5rem;

                &:focus, &:active {
                    outline: none
                }
            }

            &__buy-button {
                color: #fff;
                font-weight: 600;
                border: none;
                border-radius: .5rem;
                padding: 0 1.5rem;
                transition: all .2s;

                &:focus, &:active {
                    outline: none
                }
            }
        }
        .hover:hover {
                background-color: darken(#5DB75A, 10%) !important;
                cursor: pointer;
        }
    </style>