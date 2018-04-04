<template>
<v-container>
  <br>
  
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-btn
    absolute
    dark
    small
    fab
    right
    :to="'/list/' + (this.list_id) + '/newitem'"
    color="primary"
    class="mt-4"
  >
    <v-icon>add</v-icon>
  </v-btn>
        <v-list two-line subheader>
          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title><h2>{{ shoppingList.list_name }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ shoppingList.list_date | formatDate }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

      <!-- <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar v-for="list in shoppingLists" :key="list.list_id">
            <v-list-tile-content>v-for="item in shoppingList" :key="item.list_item"
              <v-list-tile-title><h2>{{ list.list_name }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list.list_date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
         
        </v-list>
      </v-card> -->

      <v-card>
        <v-list two-line subheader>
          <v-list-tile avatar v-for="item in shoppingList.list_items" :key="item.id">
            <v-list-tile-content>
              <v-list-tile-title>{{item}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox v-model="item.checked"></v-checkbox>
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
  } 
</script>