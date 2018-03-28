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
    // fetchDataSingleList(context) {
    //   console.log(this.$route.params.list_id)
    //   db.collection('shoppingLists').where('list_id', '==', this.$route.params.list_id).get()
    //   .then(querySnapshot =>{
    //     querySnapshot.forEach(doc => {
    //       console.log(doc.id, " => ", doc.data());
    //       context.commit('updateshoppingList', doc.data())
    //     })  
    //   })
    // }  
  },
  getters:{
    shoppingLists (state) {
      return state.shoppingLists
    },

    shoppingList (state) {
      return (list_id) =>{
        return state.shoppingLists.find((list) => {
          list.id === list_id
        })
      }
    }
  }
})