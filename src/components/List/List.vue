<template>
<v-container>
  <br>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title><h2>{{ shoppingList.list_name }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ shoppingList.list_date }}</v-list-tile-sub-title>
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
          <v-list-tile avatar v-for="item in items" :key="item.item_id">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.item_name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox v-model="item.item_checked"></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>

  export default {
    props: [
      'list_id'
    ],

    computed: {
      items(){
        return this.$store.state.items
      },
      shoppingLists(){
        return this.$store.getters.shoppingLists
      },
      shoppingList(){
        return this.$store.getters.shoppingList(this.list_id)
      }
    },

    data () {
      return {
        
      }
    }

    // beforeRouteEnter(to, from, next) {
    //   db.collection('shoppingLists').where('list_id', '==', to.params.list_id).get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       next (vm => {
    //         vm.list_id = doc.data().list_id
    //         vm.list_name = doc.data().list_name
    //         vm.list_date = doc.data().list_date
    //       })
    //     })
    //   })
    // },
  
    // watch: {
    //   '$route': 'fetchData'
    // },

    // methods: {
    //   fetchData(){
    //     db.collection('shoppingLists').where('list_id', '==', this.$route.params.list_id).get()
    //     .then(querySnapshot =>{
    //       querySnapshot.forEach(doc => {
    //         this.list_id = doc.data().list_id
    //         this.list_name = doc.data().list_name
    //         this.list_date = doc.data().list_date
    //       })  
    //     })
    //   }
    // }
  } 
</script>