<template>
  <header class="header">
      <ul class="header__nav">
          <div class="header__nav__container">
              <router-link tag="li" to="" active-class="active" class="header__item header__title"><a class="header__link">Stock Trader</a></router-link>
              <router-link tag="li" :to="{name: 'portfolio'}" active-class="active" class="header__item"><a class="header__link">Portfolio</a></router-link>
              <router-link tag="li" :to="{name: 'stocks'}" active-class="active" class="header__item"><a class="header__link">Stocks</a></router-link>
          </div>
          <div class="header__nav__container">
              <li class="header__item" @click="endDay">End day</li>
              <button class="header__item dropdown">
                  Save & Load
                  <i class="fa fa-caret-down"></i>
                  <div class="dropdown__content">
                      <a class="dropdown__option" @click="submit">Save Data</a>
                      <a class="dropdown__option" @click="fetchData">Load Data</a>
                  </div>
              </button>
              <li class="header__funds">Funds: ${{this.$store.state.funds}}</li>
          </div>
      </ul>
  </header>
</template>

<script>
export default {
    methods: {
        endDay() {
            this.$store.state.prices = [];
            this.$store.state.names = [];
            let stockPrice = (stockPrice, add, multiply) => {
                return Math.round(stockPrice * (add + Math.random() * multiply - 0.5 * multiply))
            };
            
            console.log(this.$store.state.stocks)
            this.$store.state.stocks.forEach(stock => {
                console.log(stock, stock.price)
                if (stock.price > 0 && stock.price <= 20) {
                    stock.price = stockPrice(stock.price, 3, 6);

                    if (stock.price <= 0) {
                        stock.price += 10;
                    }
                } else if (stock.price > 20 && stock.price <= 50) {
                    stock.price = stockPrice(stock.price, 2, 2);
                    
                    if (stock.price <= 0) {
                        stock.price += 10;
                    }
                } else if (stock.price > 50) {
                    stock.price = stockPrice(stock.price, 1, 1);
                }
                this.$store.state.portfolio.forEach(stockPortfolio => {
                    if (stock.name === stockPortfolio.name) {
                        stockPortfolio.price = stock.price;
                    }
                })
            })

            localStorage.setItem('stocks', JSON.stringify(this.$store.state.stocks));
            localStorage.setItem('portfolio', JSON.stringify(this.$store.state.portfolio));
        },
        submit() {
            if (this.$store.state.portfolio.length > 0) {
                this.$http.put('', this.$store.state.portfolio)
                    .then(response => {
                        console.log(response)
                    })
            }
        },
        fetchData() {
            if (this.$store.state.portfolio.length > 0) {
            this.$http.get('')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const resultsArr = data.map(el => el);
                    console.log(resultsArr)
                    this.$store.state.prices = resultsArr.map(el => el.price);
                    this.$store.state.names = resultsArr.map(el => el.name);
                    this.$store.state.fetchData = true;
                })
            }
        }   
    },
    
    created() {
      const stocks = JSON.parse(localStorage.getItem('stocks'));
      const portfolio = JSON.parse(localStorage.getItem('portfolio'));
      const funds = JSON.parse(localStorage.getItem('funds'));
      
      if (stocks.length > 1) {
            this.$store.state.stocks = stocks;
      }

       if (portfolio.length > 1) {
            this.$store.state.portfolio = portfolio;
       }

       if (funds) {
           this.$store.state.funds = funds;
       }
  },
}
</script>

<style lang='scss'>
    .active {
        color: black;
    }

    .dropdown {
        border: none;
        outline: none;
        background-color: #F8F8F7;
        color: #000;
        font-size: 1.6rem;

        &__content {
            display: none;
            width: 13%;
            background-color: #fff;
            position: absolute;
            top: 8.4rem;
            right: 21.5rem;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            border: 1px solid #e0dcdc;
            border-radius: .5rem;
        }

        &__option {
            display: block;
            padding: .8rem 2rem;
            text-align: left;
            color: #000;
            font-size: 1.5rem;
            font-weight: 100;
            transition: all .5s;

            &:hover {
                background-color: darken(#fff, 10%);
            }
        }

        &:focus &__content {
            display: block;
        }

        &:hover {
            outline: none;
        }
    }

    .header {
        background-color: #F8F8F7;
        border: 1px solid #e0dcdc;
        border-radius: .5rem;
        color: #000;
        padding: 0;
        margin-bottom: 2rem;

        &__nav {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &__container {
            display: grid;
            grid-template-columns: repeat(3, max-content);
            align-items: center;
            }
        }

        &__item, &__funds, &__link {
            color: #000;
            text-decoration: none;
            padding: 1.7rem 2rem;
            transition: all .5s;
        }

        &__item:hover {
                color:black;
                background-color: darken(#F8F8F7, 10%);
                cursor: pointer;
        }

        &__funds {
            font-weight: 600;
        }

        &__title {
            font-size: 2rem;
            font-weight: 900;
            padding: 1.2rem;
        }
        

    }
</style>