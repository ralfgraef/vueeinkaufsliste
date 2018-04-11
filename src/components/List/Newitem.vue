<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>{{ shoppingList.list_name }} - Einkaufsliste</h2>
      </v-flex>
    </v-layout>
    <br>
    
    <v-layout row v-for="item in shoppingList.list_items" :key="item.name">
      <v-flex xs12>
        <form @submit.prevent='onCreateNewItem'>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
             
             <v-text-field 
                
                name="item"
                autofocus:true
                color="grey"
                v-model="item.name"
                multiple
                id="Itemhinzu"
                >
                
              </v-text-field>

              
            </v-flex>
            <!-- <v-icon @click="onCloseClick">close</v-icon> -->
          </v-layout>
              </form>
            </v-flex>
          </v-layout>
        

    <v-layout row v-for="(find, index) in finds" :key="index">
      <v-flex xs12>
        <form @submit.prevent='onCreateNewItem'>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            
              <v-text-field 
                
                name="find"
                autofocus:true
                color="grey"
                v-model="find.name"
                multiple
                id="Findhinzu"
                placeholder="Text"
                >
                
              </v-text-field>
              
            </v-flex>
            <v-icon @click="onCloseClick(index)">close</v-icon>
          </v-layout>
          <br>
          
        </form>
      </v-flex>
    </v-layout>
    <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn :disabled="!formIsValid" @click="onCreateMore">Mehr ...</v-btn> 
            
              <v-btn :disabled="!formIsValid" @click="onShowFinds">Das war's!</v-btn> 
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
        finds: [
          { name: '',
            checked: false 
          }
        ]
      }
    },
    computed: {
      formIsValid () {
        return this.finds[0].name !== ''
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
        name: this.item,
        checked: false,
        id: this.list_id
        }  
        this.$store.dispatch('createNewItem', itemData)
        this.$router.push('/list/' + this.list_id)
        console.log(itemData)
      },

      onCreateMore() {
        
        console.log(Object.keys(name).length)
        this.finds.push({name});
        console.log(this.finds);

      },

      onShowFinds() {
        this.finds.forEach((item, index)=>{
          if (item.name=="") {
            this.finds.splice(index, 1)
          }
        })
        console.log('Finds: ', this.finds);
      },

      onCloseClick(index) {
        this.finds.splice(index, 1)
        console.log('After delete: ', this.finds);
      }
    }
  }
</script>