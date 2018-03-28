import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List/List'
import Newlist from '@/components/List/Newlist'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list/:list_id',
      name: 'list_id',
      props: true,
      component: List
    },
    {
      path: '/newlist',
      name: 'newlist',
      component: Newlist
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
