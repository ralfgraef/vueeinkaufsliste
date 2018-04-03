<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neuen EinkaufsListeneintrag anlegen</h2>
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
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent='onCreateNewItem'>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <br>
              <v-text-field
                name="item"
                label="Was willst Du hinzufügen?"
                color="grey"
                v-model="item"
                required
                id="Itemhinzu"
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
     props: [
      'list_id'
    ],
    data () {
      return {
        item:'',  
        
      }
    },
    computed: {
      formIsValid () {
        return this.item !== ''
      },
      // shoppingLists(){
      //   return this.$store.getters.shoppingLists
      // },
      shoppingList(){
        return this.$store.getters.shoppingList(this.list_id)
      }
    },
    methods: {
      onCreateNewItem () {
        if(!this.formIsValid) {
          return
        }
        const itemData = {
        item: this.item,
        id: this.list_id
        }  
        this.$store.dispatch('createNewItem', itemData)
        this.$router.push("/")
        console.log(itemData)
      }
    }
  }
</script>