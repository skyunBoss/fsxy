import Vue from 'vue'
import App from './App'
import emptyData from './components/emptyData.vue'

import store from './store'

Vue.component('emptyData', emptyData)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
