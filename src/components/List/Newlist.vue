<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neue EinkaufsListe anlegen</h2>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateNewList">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-select
                :items="shoppingListsNames"
                v-model="e1"
                label="Such Dir einen Shop aus..."
                single-line
                color="grey"
                required
                >
                </v-select>
              <br>
              <v-text-field
                name="name"
                label="Wo willst Du einkaufen?"
                id="name"
                color="grey"
                v-model="name"
                required
                >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn :disabled="!formIsValid" type="submit">Create List</v-btn> 
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    
    data () {
      return {
        name: '',
        e1: null,
        items: []
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' || this.e1 !== null
      },
      shoppingListsNames () {
        return this.$store.getters.shoppingListsNames
      }

    },
    methods: {
      onCreateNewList () {
        if(!this.formIsValid) {
          return
        }
        const listData = {
        name: this.name,
        date: new Date(),
        }  
        this.$store.dispatch('createNewList', listData)
        this.$router.push('/')
      }
    },
    created () {
    this.$store.dispatch('fetchDataShoppingListsNames');
    //console.log(this.$store.state)
  },
  }
</script>