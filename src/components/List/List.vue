<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
     

      <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title><h2>{{ list_name }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list_date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
         
        </v-list>
      </v-card>

      <!-- <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar v-for="list in shoppingLists" :key="list.list_id">
            <v-list-tile-content>
              <v-list-tile-title><h2>{{ list.list_name }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list.list_date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
         
        </v-list>
      </v-card> -->

      <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar v-for="item in items" :key="item.itemTitle">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.itemTitle }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox v-model="item.itemChecked"></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
          
         
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import db from '@/components/firebaseInit'
  export default {
    computed: {
      items(){
        return this.$store.state.items
      },
      shoppingLists(){
        return this.$store.state.shoppingLists
      }
    },

    data () {
      return {
        list_id: null,
        list_date: null,
        list_name: false
      }
    },

    beforeRouteEnter(to, from, next) {
      db.collection('shoppingLists').where('list_id', '==', to.params.list_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next (vm => {
            vm.list_id = doc.data().list_id
            vm.list_name = doc.data().list_name
            vm.list_date = doc.data().list_date
          })
        })
      })
    },
  
    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData(){
        db.collection('shoppingLists').where('list_id', '==', this.$route.params.list_id).get()
        .then(querySnapshot =>{
          querySnapshot.forEach(doc => {
            this.list_id = doc.data().list_id
            this.list_name = doc.data().list_name
            this.list_date = doc.data().list_date
          })  
        })
      }
    }
  } 
</script>