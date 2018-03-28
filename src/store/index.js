import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Router from 'vue-router'

Vue.use(Vuex)
Vue.use(Router)

import db from '@/components/firebaseInit'

export const store = new Vuex.Store({
  state:{ 
    items:[],
    shoppingLists:[]
  },

  mutations:{
    updateitems(state, data) {
      store.state.items.push(data)
    },
    updateshoppingLists(state, data) {
      store.state.shoppingLists.push(data)
    }
  },

  actions:{
    fetchDataItems(context) {db.collection("items").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        context.commit('updateitems', doc.data())
      });
      })
    },

    fetchDataShoppingLists(context) {db.collection("shoppingLists").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        context.commit('updateshoppingLists', doc.data())
      });
      })
    }
    
  },
  getters:{
    shoppingLists (state) {
      return state.shoppingLists
    },

    shoppingList (state) {
      return (listID) =>{
        return state.shoppingLists.find((list) => {
          return list.list_id === listID
        })
      }
    }
  }
})