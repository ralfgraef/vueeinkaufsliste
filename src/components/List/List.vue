<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <br>
      <br>
      <v-card>
        <v-list two-line subheader>
          
          <v-list-tile avatar v-for="list in shoppingLists" :key="list.id">
            <v-list-tile-content>
              <v-list-tile-title><h2>{{ list.shoppingListName }}</h2></v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
         
        </v-list>
      </v-card>

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
        notifications: false,
        sound: false,
        video: false
      }
    }
  }
</script>