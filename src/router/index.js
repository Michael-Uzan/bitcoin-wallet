import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContactApp from '../views/ContactApp.vue'
import ContactDetails from '../views/ContactDetails'
import ContactEdit from '../views/ContactEdit'
import Dashboard from '../views/Dashboard'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'ContactApp',
    component: ContactApp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/contact/edit/:contactId?',
    name: 'ContactEdit',
    component: ContactEdit
  },
  {
    path: '/contact/:contactId',
    name: 'ContactDetails',
    component: ContactDetails
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
