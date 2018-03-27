<template>
  <v-container>
    <br>
    
    <v-card xs6>
      <v-list two-line subheader>
        <v-subheader>Aktuelle Listen:</v-subheader>
          <v-list-tile avatar v-for="list in shoppingLists" :key="list.id">
            <v-list-tile-content  class="mb-2">
              <v-list-tile-title>{{ list.shoppingListName }} ID: {{ list.id }}</v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    computed: {
      shoppingLists(){
        return this.$store.state.shoppingLists
      }
    },

    data () {
      return {
     
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
