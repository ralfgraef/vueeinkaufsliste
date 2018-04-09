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
          {{ menueItem.title }}
          <v-icon right>{{ menueItem.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app >
      <span class="ml-3">&copy; {{ new Date().getFullYear() }} Ralf Johann Gräf</span>
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
      fixed: true
    }
  },

  computed: {
    menueItems () {
      let menueItems = [
        { icon: 'group_add', title: 'Register', link: '/register' },
        { icon: 'input', title: 'Log in', link: '/login' }
      ]
      if (this.userIsAuthenticated) {
        menueItems = [
        { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menueItems
    },

    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined 
    }
  },

  created () {
    this.$store.dispatch('fetchDataShoppingLists');
    //console.log(this.$store.state)
  },
  
  name: 'App'
}
</script>
