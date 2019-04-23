import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDPelvtM68dd_rZuhqpyOaVj-W6MToyX9o',
  authDomain: 'beekelfarmskennel-8812a.firebaseapp.com',
  databaseURL: 'https://beekelfarmskennel-8812a.firebaseio.com',
  projectId: 'beekelfarmskennel-8812a',
  storageBucket: 'beekelfarmskennel-8812a.appspot.com',
  messagingSenderId: '1026150645025'
}
firebase.initializeApp(config)

export default firebase
