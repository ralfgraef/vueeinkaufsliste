<template>
  <v-container>
    <br>
    <!-- 
       <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn flat slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.stop="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
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

    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-card v-if="shoppingLists.length>0">
          <v-btn flat :to="'/newlist'" class="right">
          Neue Liste   
          <v-icon right light>control_point</v-icon>
          </v-btn> 
          <v-list two-line subheader>
            <v-subheader><h3>Aktuelle Listen:</h3></v-subheader>
              <v-list-tile avatar v-for="list in shoppingLists" :key="list.list_id">
                <v-list-tile-content class="text-xs-left">
                  <v-list-tile-title>{{ list.list_name }} </v-list-tile-title>
                  <v-list-tile-sub-title>Erstellt am: {{ list.list_date | formatDate }}</v-list-tile-sub-title>
                </v-list-tile-content>
                  <v-card-actions>
                    <v-btn flat  :to="'/list/' + list.list_id" class="right">
                    Ansehen
                    </v-btn>
                  </v-card-actions>  
              </v-list-tile>
          </v-list>
        </v-card>
        <v-card v-else>
          <v-btn flat :to="'/newlist'" class="right">
          Neue Liste   
          <v-icon right light>control_point</v-icon>
          </v-btn> 
          <v-list two-line subheader>
            <v-subheader><h3></h3></v-subheader>
              <v-list-tile avatar >
                <v-list-tile-content class="text-xs-left">
                  <v-list-tile-title>Keine Einkaufsliste vorhanden ... </v-list-tile-title>
                  <v-list-tile-sub-title></v-list-tile-sub-title>
                </v-list-tile-content> 
              </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      shoppingLists(){
        return this.$store.getters.shoppingLists
      },
      loading () {
        return this.$store.getters.loading
      }
    },

    data () {
      return {
        dialog:''
      }
    }
  }
</script>
