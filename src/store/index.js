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
    shoppingLists:[],
    shoppingListsNames:[],
    user: null,
    loading: false,
    error: null
  },

  mutations:{
    updateitems(state, data) {
      state.items.push(data)
    },
    updateshoppingLists(state, data) {
      state.shoppingLists.push(data)
    },
    updateshoppingListsNames(state, data) {
      state.shoppingListsNames.push(data)
    },
    createNewList (state, payload) {
      state.shoppingLists.unshift(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    clearShoppingListsNames (state) {
      state.shoppingListsNames = []
    }
  },

  actions:{
    fetchDataItems(context) {db.collection("items").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        
        context.commit('updateitems', doc.data())
      });
      })
    },

    fetchDataShoppingLists(context) {
    context.commit('setLoading', true)
    db.collection("shoppingLists").orderBy('list_date', 'desc').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        const data = {
          'list_id': doc.id,
          'list_name': doc.data().list_name,
          'list_date': doc.data().list_date,
          'list_items': doc.data().list_items
        }
        context.commit('updateshoppingLists', data)
        context.commit('setLoading', false)
      })
      }).catch(error => console.log(error));
    },

    fetchDataShoppingListsNames(context) {
      context.commit('setLoading', true)
      context.commit('clearShoppingListsNames')
    db.collection("shoppingLists").orderBy('list_date', 'desc').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const data = {
          'text': doc.data().list_name,
        }
        context.commit('updateshoppingListsNames', data)
        context.commit('setLoading', false)
      })
      }).catch(error => console.log(error));
    },

    createNewList ({commit}, payload) {
      const list = {
        list_name: payload.name,
        list_date: payload.date
      }
      //Reach out to firestore and store
      db.collection('shoppingLists').add(list)
      .then((data) => {
        const key = data.id
        commit('createNewList', {
          ...list,
          list_id: key
        })
      })
      .catch(error => console.log(error))
      
    },

    createNewItem ({commit}, payload) {
      // const item= {
      //   list_item: payload.item
      // }
      //Reach out to firestore and store
      db.collection('shoppingLists').doc(payload.id).update({
        "'list_items.' + payload.item'": payload.item,
        "'list_items.' + payload.item.checked'": false
      })
      .then(() => {
        console.log('Updated!')
      })
      .catch(error => console.log(error))
      
    },

    regUserUp({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then (
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            shoppingLists: []
          }
          commit('setUser', newUser)
        }
      )
      .catch (
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },

    logUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            shoppingLists: []
          }
          commit('setUser', newUser)
        }
      )
      .catch (
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    },
    clearShoopingListsNames ({commit}) {
      commit('clearShoppingListsNames')
    }
  },

  getters:{

    shoppingLists (state) {
      return state.shoppingLists
    },

    shoppingListsNames (state) {
      return state.shoppingListsNames
    },

    shoppingList (state) {
      return (listID) =>{
        return state.shoppingLists.find((list) => {
          return list.list_id === listID
        })
      }
    },

    user (state) {
      return state.user
    },

    loading (state) {
      return state.loading
    },

    error (state) {
      return state.error
    }
  }
})