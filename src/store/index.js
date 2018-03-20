import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

import db from '@/components/firebaseInit'

export const store = new Vuex.Store({
  state:{ items:[
   { title:'', checked: '', date:'' }]
    },
  mutations:{
    update(state, data) {
    store.state.items.push(data)
    }
  },
  actions:{
    fetchData(context) {db.collection("items").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // store.state.item.title = doc.data.title
          // store.state.item.checked = doc.data.checked
          // store.state.item.date = doc.data.date
          
          console.log(doc.id, " => ", doc.data());
         context.commit('update', doc.data())
      });
    })
  }  
  },
  getters:{}
})