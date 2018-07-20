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
        <form @submit.prevent="onCreateNewListSelect()">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-select
                :items="shopNames"
                v-model="e1"
                label="Such Dir einen bereits vorhandenen Shop aus..."
                color="grey"
               >
                </v-select>
              <br>
              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn :disabled="!formSelectIsValid" type="submit">Create List</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateNewList(shopNames)">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            
              <v-text-field
                name="name"
                label="... oder lege einen neuen an."
                id="name"
                color="grey"
                v-model="name"
                
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
        return this.name !== ''
      },
      formSelectIsValid () {
        return this.e1 !== null
      },
      shopNames () {
        return this.$store.getters.shopNames
      }
    },

    methods: {
      onCreateNewList (shopNames) {
        if(!this.formIsValid) {
          return
        }
        const listData = {
        name: this.name,
        date: new Date(),
        }
        this.$store.dispatch('createNewList', listData)
        console.log('Name', listData.name);
        console.log('shopNames', shopNames);
        
        
        // function checkNewShop(test) {
        //   shopNames.forEach( (shopNames) => {
        //     if(!Object.values(shopNames).includes(listData.name)){
        //       console.log('Ist noch nicht drin, Puppekopp!!!');
        //       return true;
        //     } else{
        //       return false;
        //     }
        //   });
        //}
        let result = shopNames.map(a => a.text);
        
        console.log(result);
        if (!result.includes(listData.name)) {
          alert('Ist nix drin, kommt jetzt rein!!');
           this.$store.dispatch('createNewShop', listData);
        } else {
          console.log('Ist drin, braucht nicht rein!');
        }

        // if(newShop) {
        //   this.$store.dispatch('createNewShop', listData);
        // }
        
        this.$router.push('/')
      },

      onCreateNewListSelect () {
        if(!this.formSelectIsValid) {
          return
        }

        const listData = {
        name: this.e1.text,
        date: new Date(),
        }
        this.$store.dispatch('createNewList', listData)
        this.$router.push('/')
      }
    },

    created () {
    this.$store.dispatch('fetchDataShopNames');
    //console.log(this.$store.state)
    }
    
  }
</script>
