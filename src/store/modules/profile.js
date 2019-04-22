import router from '@/router'
import db from '@/db/db'
import uuid from 'uuid'

const state = {
  profile: null,
  petProfiles: []
}

const mutations = {
  setProfile: (state, payload) => {
    state.profile = payload
  },
  setPetProfiles: (state, payload) => {
    state.petProfiles = payload
  },
  resetProfile: (state, payload) => {
    state.profile = payload
  },
  resetPetProfiles: (state, payload) => {
    state.petProfiles = payload
  }
}

const actions = {
  saveProfile: ({ rootState, commit }, payload) => {
    db.collection('profiles').add({
      ...payload,
      user_id: rootState.auth.user.user_id
    })
    router.push('/reservation')
    commit('setProfile', payload)
  },
  getProfile: ({ rootState, commit }) => {
    db.collection('profiles')
      .where('user_id', '==', rootState.auth.user.user_id)
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          commit('setProfile', doc.data())
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  addPetProfile: ({ rootState, dispatch }, payload) => {
    db.collection('pet-profiles').add({
      ...payload,
      user_id: rootState.auth.user.user_id,
      profile_id: uuid()
    })
    dispatch('getPetProfiles')
  },
  getPetProfiles: ({ rootState, commit }) => {
    db.collection('pet-profiles')
      .where('user_id', '==', rootState.auth.user.user_id)
      .get()
      .then(snapShot => {
        const petProfiles = []
        snapShot.docs.forEach(doc => {
          petProfiles.push({ ...doc.data() })
        })
        commit('setPetProfiles', petProfiles)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateUserProfile({ commit }, profile) {
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
        commit('setProfile', updatedProfile)
      })
    })
  },
  updatePetProfile(_, petProfile) {
    console.log(petProfile)
    const petProfileRef = db
      .collection('pet-profiles')
      .where('profile_id', '==', petProfile.profile_id)

    petProfileRef
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          doc.ref.update({
            petName: petProfile.petName,
            petAge: petProfile.petAge,
            petBreed: petProfile.petBreed,
            specialtyNeeds: petProfile.specialtyNeeds,
            tempermant: petProfile.tempermant,
            petMedice: petProfile.petMedice,
            petDiet: petProfile.petDiet
          })
        })
      })
      .catch(err => console.log(err))
  },
  resetState: ({ state, commit }) => {
    commit('resetProfile', null)
    commit('resetPetProfiles', [])
  }
}

const getters = {
  profile: state => {
    return state.profile
  },
  petProfiles: state => {
    return state.petProfiles
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
