<template>
  <v-container>
    <br>
    <v-card xs6>
          <v-btn flat  :to="'/newlist'" class="right">
       Neue Liste   
      <v-icon right light>control_point</v-icon>
    </v-btn>
      <v-list two-line subheader>
        <v-subheader>Aktuelle Listen:
       
        </v-subheader>
          <v-list-tile avatar v-for="list in shoppingLists" :key="list.list_id">
            <v-list-tile-content>
              <v-list-tile-title>{{ list.list_name }} ID: {{ list.list_id }}</v-list-tile-title>
              <v-list-tile-sub-title>Erstellt am: {{ list.list_date }}</v-list-tile-sub-title>
               
            </v-list-tile-content>
              <v-card-actions>
                  <v-btn flat  :to="'/list/' + list.list_id" class="right">
                 
                    Ansehen
                  </v-btn>
              </v-card-actions>  
          </v-list-tile>
      </v-list>
    </v-card>
    
  </v-container>
</template>

<script>
  export default {
    computed: {
      shoppingLists(){
        return this.$store.getters.shoppingLists
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
