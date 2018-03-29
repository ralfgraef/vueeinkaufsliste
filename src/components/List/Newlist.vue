<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neue EinkaufsListe anlegen</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateNewList">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                label="Wo willst Du einkaufen?"
                id="name"
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
        name: ''
      }
    },
    computed: {
      formIsValid () {
        return this.name !== ''
      }
    },
    methods: {
      onCreateNewList () {
        const listData = {
        name: this.name,
        date: new Date(),
        id: 7
        }  
        this.$store.dispatch('createNewList', listData)
      }
    }
  }
</script>