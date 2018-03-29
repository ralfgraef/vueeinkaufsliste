import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import './components/firebaseInit'
import DateFilter from './Filters/date'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('formatDate', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
