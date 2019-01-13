import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var app = new Vue({
  el: "#app",
  render: function (h) { return h(App) }
});
