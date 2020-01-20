import Vue from 'vue'
import App from './App.vue'

// import * as web3 from '@solana/web3.js'

import store from './store'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'wss://testnet.solana.com:3443/', { store, format: 'json', reconnection: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
