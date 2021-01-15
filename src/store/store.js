import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    funds: 10000,
    indexStock: 0,
    stocks: [
      { name: "BMV", price: 81 },
      { name: "Google", price: 44 },
      { name: "Apple", price: 280 },
      { name: "Twitter", price: 6 }
    ],
    portfolio: [],
    prices: [],
    names: [],
    fetchDataClicked: false
  },
  mutations: {
    key: (state, payload) => {
      if (
        payload.event.keyCode === 189 ||
        payload.event.keyCode === 190 ||
        payload.event.keyCode === 191 ||
        payload.event.keyCode === 188 ||
        payload.event.keyCode === 109 ||
        payload.event.keyCode === 107 ||
        payload.event.keyCode === 187 ||
        payload.event.keyCode === 69 ||
        (!payload.input && payload.event.key == 0)
      ) {
        payload.event.preventDefault();
      }
    },

    isDisable: (state, payload) => {
      const buttons = document.querySelectorAll(`.${payload.btn}`);
      const buttonsArr = Array.from(buttons);
      if (payload.input) {
        if (buttonsArr.length > 0) {
          buttonsArr[payload.index].style.backgroundColor = payload.darkColor;
          buttonsArr[payload.index].classList.add("hover");
        }
        return false;
      } else {
        if (buttonsArr.length > 0) {
          buttonsArr[payload.index].style.backgroundColor = payload.lightColor;
          buttonsArr[payload.index].classList.remove("hover");
        }
        return true;
      }
    },

    styleDisabledButtons: (state, payload) => {
      const buttons = document.querySelectorAll(`.${payload.btn}`);
      const buttonsArr = Array.from(buttons);
      buttonsArr.forEach(el => (el.style.backgroundColor = payload.lightColor));
    }
  },
  actions: {
    key: (context, payload) => {
      context.commit("key", payload);
    },

    isDisable: (context, payload) => {
      context.commit("isDisable", payload);
    },

    styleDisabledButtons: (context, payload) => {
      context.commit("styleDisabledButtons", payload);
    }
  }
});
