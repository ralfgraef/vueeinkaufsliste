<template>
<v-container>
  <br>
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular 
      indeterminate 
      color="grey"
      :width="7"
      :size="100"
      v-if="loading"
      ></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row v-if="!loading">
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

      <v-card>
        <v-list two-line subheader>
          <v-list-tile avatar v-for="item in shoppingList.list_items" :key="item.name" v-if="item.name">
            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
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
      shoppingLists(){
        return this.$store.getters.shoppingLists
      },
      shoppingList(){
        return this.$store.getters.shoppingList(this.list_id)
      },
      loading () {
        return this.$store.getters.loading
      }
    },

    data () {
      return {
        
      }
    }
  } 
</script>