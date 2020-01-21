import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as web3 from '@solana/web3.js'

let connection = new web3.Connection(web3.testnetChannelEndpoint('stable'));
connection.onSlotChange((slotChange) => {
  store.commit('addSlotChange', slotChange)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
