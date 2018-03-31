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
    createNewList (state, payload) {
      state.shoppingLists.push(payload)
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
    },

    createNewList ({commit}, payload) {
      const list = {
        list_name: payload.name,
        list_date: payload.date,
        list_id: payload.id
      }
      //Reach out to firestore and store
      commit('createNewList', list)
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