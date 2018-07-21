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
    shopNames:[],
    loading: false,
    error: null
  },

  mutations:{
    updateshoppingLists(state, data) {
      state.shoppingLists.push(data)
    },
    updateshopNames(state, data) {
      state.shopNames.push(data)
    },
    createNewShop (state, payload) {
      state.shopNames.unshift(payload)
    },
    createNewList (state, payload) {
      state.shoppingLists.unshift(payload)
    },
    updateListItems(state, payload){
      const list = state.shoppingLists.find(list => {
        return list.list_id === payload.id
      })
      console.log('List vorher:', list);
      list.list_items.push({
        name: payload.name,
        checked: payload.checked
      })
      console.log('List nachher:', list);
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
    clearShopNames (state) {
      state.shopNames = []
    }
  },

  actions:{
    fetchDataShoppingLists(context) {
    context.commit('setLoading', true)
    db.collection("shoppingLists").orderBy('list_date', 'desc').get()
    .then(function(querySnapshot) {
      console.log('querySnapshot.empty: ', querySnapshot.empty);
      if (querySnapshot.empty==false){
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
      }

      else {
        context.commit('setLoading', false)
        console.log('No Data!!');
      }

      }).catch(error => console.log(error));
    },

    fetchDataShopNames(context) {
      context.commit('setLoading', true)
      context.commit('clearShopNames')
    db.collection("shopNames").orderBy('shop_name', 'desc').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const data = {
          'text': doc.data().shop_name,
        }
        context.commit('updateshopNames', data)
        context.commit('setLoading', false)
      })
      }).catch(error => console.log(error));
    },

    createNewShop({commit}, payload) {
      commit('setLoading', true)

      const shop = {
        shop_name: payload.name
      }
      console.log(shop);
      //Reach out to firestore and store
      db.collection('shopNames').add(shop)
      .then((data) => {
        commit('setLoading', false)

      })
      .catch(error => console.log(error))

    },

    createNewList ({commit}, payload) {
      commit('setLoading', true)
      const list = {
        list_name: payload.name,
        list_date: payload.date,
        list_items:[ {
            name:'',
            checked:false
          }
        ]
      }

      //Reach out to firestore and store
      db.collection('shoppingLists').add(list)
      .then((data) => {
        const key = data.id
        commit('createNewList', {
          ...list,
          list_id: key
        })
        commit('setLoading', false)

      })
      .catch(error => console.log(error))

    },

    createNewItem ({commit}, payload) {
      commit('setLoading', true)
      console.log('payload: ', payload);
      db.collection("shoppingLists").doc(payload[0].id).get()
      .then(function(doc) {

        console.log(doc.id, " => lala ", doc.data().list_items)



        let newItem = (doc.data().list_items.concat(new Object({
          checked: false,
          name: payload[0].name,
        })))

        console.log('Neues Array: ', newItem)
        //Reach out to firestore and store
        db.collection('shoppingLists').doc(payload[0].id).update({

          'list_items': newItem
        })
        .then(() => {
          //commit('updateListItems', payload)
          commit('setLoading', false)
          console.log('Updated!')

        })
        .catch(error => console.log(error))
      });

    }

    // regUserUp({commit}, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //   .then (
    //     user => {
    //       commit('setLoading', false)
    //       const newUser = {
    //         id: user.uid,
    //         shoppingLists: []
    //       }
    //       commit('setUser', newUser)
    //     }
    //   )
    //   .catch (
    //     error => {
    //       commit('setLoading', false)
    //       commit('setError', error)
    //       console.log(error)
    //     }
    //   )
    // },

    // logUserIn ({commit}, payload) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //   .then(
    //     user => {
    //       commit('setLoading', false)
    //       const newUser = {
    //         id: user.uid,
    //         shoppingLists: []
    //       }
    //       commit('setUser', newUser)
    //     }
    //   )
    //   .catch (
    //     error => {
    //       commit('setLoading', false)
    //       commit('setError', error)
    //       console.log(error)
    //     }
    //   )
    // },
    // clearError ({commit}) {
    //   commit('clearError')
    // },
    // clearShoopingListsNames ({commit}) {
    //   commit('clearShoppingListsNames')
    // }
  },

  getters:{

    shoppingLists (state) {
      return state.shoppingLists
    },

    shopNames (state) {
      return state.shopNames
    },

    shoppingList (state) {
      return (listID) =>{
        return state.shoppingLists.find((list) => {
          return list.list_id === listID
        })
      }
    },

    loading (state) {
      return state.loading
    },

    error (state) {
      return state.error
    }
  }
})
