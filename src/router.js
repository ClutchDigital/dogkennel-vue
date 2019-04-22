import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import ProfileForm from './views/ProfileForm.vue'
import DogProfile from './views/DogProfile.vue'
import Reservation from './views/Reservation.vue'
import Available from './views/Available.vue'
import AdminLogin from './views/admin/AdminLogin.vue'
import AdminPage from './views/admin/AdminPage.vue'
import ReservationSearch from './views/admin/ReservationSearch.vue'
import SelectedProfile from './views/admin/SelectedProfile.vue'
import SearchOwners from './views/admin/SearchOwners.vue'
import AddCustomer from './views/admin/AddCustomer.vue'
import MakeReservation from './views/admin/MakeReservation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/new/profile/:id',
      name: 'profileform',
      component: ProfileForm
    },
    {
      path: '/new/pet/profile',
      name: 'dogprofile',
      component: DogProfile
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation
    },
    {
      path: '/reservation/available',
      name: 'Available',
      component: Available
    },
    {
      path: '/admin/bfk/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/bfk',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/admin/bfk/reservations',
      name: 'ReservationSearch',
      component: ReservationSearch
    },
    {
      path: '/admin/bfk/profile/:id',
      name: 'SelectedProfile',
      component: SelectedProfile
    },
    {
      path: '/admin/bfk/search',
      name: 'SearchOwners',
      component: SearchOwners
    },
    {
      path: '/admin/bfk/add',
      name: 'AddCustomer',
      component: AddCustomer
    },
    {
      path: '/admin/bfk/reservation',
      name: 'MakeReservation',
      component: MakeReservation
    },
    {
      path: '/admin/bfk/make/reservation/:id',
      component: MakeReservation
    }
  ]
})
