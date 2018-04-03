<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neuen EinkaufsListeneintrag anlegen</h2>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateNewItem">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <br>
              <v-text-field
                name="name"
                label="Was willst Du hinzufügen?"
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
              <v-btn :disabled="!formIsValid" type="submit">Create!</v-btn> 
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
        name:''   
      }
    },
    computed: {
      formIsValid () {
        return this.name !== ''
      }
    }
  }
</script>