import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const config = {
  apiKey: 'AIzaSyAEGxbbtT0qsnBT6_v9TAnPf3O389DR7rs',
  authDomain: 'personal-finance-35f88.firebaseapp.com',
  databaseURL: 'https://personal-finance-35f88.firebaseio.com',
  storageBucket: 'personal-finance-35f88.appspot.com',
  messagingSenderId: '1015201211301'
}
export const firebaseApp = firebase.initializeApp(config)
