import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/db/firebase.config'
import router from '@/router'
import uuid from 'uuid'
import db from '@/db/db'
import auth from '@/store/modules/auth'
import profile from '@/store/modules/profile'
import reservation from '@/store/modules/reservation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDay: null,
    adminUser: null,
    allReservations: [],
    loading: false,
    selectedProfile: null,
    selectedProfilePets: [],
    selectedProfileReservations: [],
    allUsers: []
  },

  mutations: {
    setCurrentDay: (state, day) => {
      state.currentDay = day
    },
    setAdminUser: (state, adminUser) => {
      state.adminUser = adminUser
    },
    setAllReservations: (state, allReservations) => {
      state.allReservations = allReservations
    },
    setLoading: (state, loading) => {
      state.loading = loading
    },
    setSelectedProfile: (state, selectedProfile) => {
      state.selectedProfile = selectedProfile
    },
    setSelectedProfilePets: (state, selectedProfilePets) => {
      state.selectedProfilePets = selectedProfilePets
    },
    setSelectedProfileReservations: (state, reservations) => {
      state.selectedProfileReservations = reservations
    },
    setAllUsers: (state, users) => {
      state.allUsers = users
    }
  },

  actions: {
    adminLogin({ commit }, admin) {
      firebase
        .auth()
        .signInWithEmailAndPassword(admin.email, admin.password)
        .then(user => {
          const newAdminUser = {
            user_id: user.user.uid,
            email: user.user.email
          }
          commit('setAdminUser', newAdminUser)
          router.push('/admin/bfk')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllReservations({ commit }) {
      const reservationsRef = db
        .collection('reservations')
        .orderBy('checkin_date', 'asc')

      const allReservations = []
      reservationsRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          allReservations.push(doc.data())
        })

        commit('setAllReservations', allReservations)
      })
    },
    runReservationSearch({ commit }, query) {
      if (query.option === 'Arrival') {
        const reservationsRef = db
          .collection('reservations')
          .where('checkin_date', '>=', query.date1)
          .where('checkin_date', '<=', query.date2)
          .orderBy('checkin_date', 'asc')
        commit('setLoading', true)
        const allReservations = []
        reservationsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            allReservations.push(doc.data())
            commit('setAllReservations', allReservations)
            commit('setLoading', false)
          })
        })
      } else {
        const reservationsRef = db
          .collection('reservations')
          .where('dates.checkout_date', '>=', query.date1)
          .where('dates.checkout_date', '<=', query.date2)
          .orderBy('dates.checkout_date', 'asc')
        commit('setLoading', true)
        const allReservations = []
        reservationsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            allReservations.push(doc.data())
          })
          commit('setAllReservations', allReservations)
          commit('setLoading', false)
        })
      }
    },
    selectProfile({ dispatch, commit }, id) {
      const profileRef = db.collection('profiles').where('user_id', '==', id)

      profileRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          commit('setSelectedProfile', { ...doc.data() })
        })
        dispatch('getPetProfiles', id)
        dispatch('getSelectedProfileReservations', id)
      })
    },
    getPetProfiles: ({ commit }, id) => {
      db.collection('pet-profiles')
        .where('user_id', '==', id)
        .get()
        .then(snapShot => {
          const petProfiles = []
          snapShot.docs.forEach(doc => {
            petProfiles.push({ ...doc.data() })
          })
          commit('setSelectedProfilePets', petProfiles)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSelectedProfileReservations: ({ commit }, id) => {
      db.collection('reservations')
        .where('creator_id', '==', id)
        .get()
        .then(snapShot => {
          const reservations = []
          snapShot.docs.forEach(doc => {
            reservations.push({ ...doc.data() })
          })
          commit('setSelectedProfileReservations', reservations)
        })
    },
    getAllUsers: ({ commit }) => {
      const usersRef = db.collection('profiles').orderBy('lastName', 'asc')

      const users = []
      usersRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          users.push({ ...doc.data() })
        })
        commit('setAllUsers', users)
      })
    },

    // RESERVATION FUNCTIONS
    async saveUserReservation({ dispatch }, reservation) {
      const reservationsRef = db.collection('reservations')

      await reservationsRef.add(reservation)
      await dispatch('getAllReservations')
      router.push('/admin/bfk/reservations')
    },
    cancelReservation({ state, dispatch }, res) {
      db.collection('reservations')
        .where('res_id', '==', res.res_id)
        .get()
        .then(snapShot => {
          snapShot.docs.forEach(doc => {
            doc.ref.delete()
            console.log('Deleted')
          })
          dispatch('getAllReservations')
          if (state.selectedProfile) {
            dispatch('getSelectedProfileReservations', res.creator_id)
          }
        })
    },

    // UPDATE FUNCTIONS
    updateProfile({ commit }, profile) {
      const profileRef = db
        .collection('profiles')
        .where('user_id', '==', profile.user_id)

      profileRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          doc.ref.update({
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
            address: profile.address,
            clinic: profile.clinic,
            vetEmail: profile.vetEmail,
            vetAddress: profile.vetAddress,
            vetPhone: profile.vetPhone,
            vetFax: profile.vetFax
          })

          const updatedProfile = profile
          commit('setSelectedProfile', updatedProfile)
        })
      })
    },

    // ADD CUSTOMERS
    signUpEmail({ dispatch }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          payload.profile.email,
          payload.profile.password
        )
        .then(user => {
          console.log(user.user.uid)
          const newUser = {
            user_id: user.user.uid,
            email: user.user.email
          }
          db.collection('users')
            .doc(newUser.user_id)
            .set(newUser)

          // delete payload.profile.password
          const newUserProfile = {
            ...payload.profile,
            user_id: newUser.user_id
          }
          const petProfile = { ...payload.petProfile, user_id: newUser.user_id }
          dispatch('saveProfile', newUserProfile)
          dispatch('addPetProfile', petProfile)
          router.push('/admin/bfk/search')
        })
    },
    saveProfile: (_, payload) => {
      db.collection('profiles').add({ ...payload })
    },
    addPetProfile: ({ state, dispatch }, payload) => {
      db.collection('pet-profiles').add({
        ...payload,
        // user_id: state.selectedProfile.user_id,
        user_id: payload.user_id,
        profile_id: uuid()
      })
      dispatch('getPetProfiles', payload.user_id)
    }
  },

  getters: {
    currentDay: state => state.currentDay,
    allReservations: state => state.allReservations,
    loading: state => state.loading,
    selectedProfile: state => state.selectedProfile,
    selectedProfilePets: state => state.selectedProfilePets,
    selectedProfileReservations: state => state.selectedProfileReservations,
    allUsers: state => state.allUsers
  },

  modules: {
    auth,
    profile,
    reservation
  }
})
