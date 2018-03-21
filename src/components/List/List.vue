<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <br>
      <br>
      <v-card>
        <v-list two-line subheader>
          <v-subheader>vuex state-test</v-subheader>
          
          <v-list-tile avatar v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-checkbox v-model="item.checked"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>Date: {{ item.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          
         
        </v-list>
        <div id="einkaufsliste">
      <h2>Einkaufsliste im simple mode</h2>
      <ul>
        <li v-for="item in items" :key="item.title">
          <span class="title">{{ item.title }}</span>
          <span class="checked">{{ item.checked }}</span>
          <span class="date">{{ item.date }}</span>
        </li>
      </ul>
    </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    computed: {
      items(){
        return this.$store.state.items
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