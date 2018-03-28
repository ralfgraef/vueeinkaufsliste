<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav" fixed>
      <v-list>
         <v-list-tile v-for="menueItem in menueItems" :key="menueItem.title" :to="menueItem.link">
          <v-list-tile-action>
            <v-icon>{{ menueItem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ menueItem.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor:pointer">EinkaufsListe</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="menueItem in menueItems" :key="menueItem.title" :to="menueItem.link">
          <v-icon left>{{ menueItem.icon }}</v-icon>
          {{ menueItem.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app >
      <span class="right">&copy; {{ new Date().getFullYear() }} Ralf Johann Gräf</span>
    </v-footer>
  </v-app>
</template>

<script>
import db from './components/firebaseInit'
export default {
  data () {
    return {
      title: 'EinkaufsListe',
      sideNav: false,
      fixed: true,
      menueItems: [
        { icon: 'group_add', title: 'Register', link: '/register' },
        { icon: 'input', title: 'Log in', link: '/login' }
      ]
    }
  },
  created () {
    this.$store.dispatch('fetchDataItems');
    this.$store.dispatch('fetchDataShoppingLists');
    //console.log(this.$store.state)
  },
 
  name: 'App'
}
</script>
