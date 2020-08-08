import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig)
    this.auth = firebase.auth()
    this.database = firebase.database()
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.gitHubProvider = new firebase.auth.GithubAuthProvider()

    this.userCards = []
    this.userUid = null
  }

  setUserUid = uid => this.userUid = uid
  getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`)
  getUserCardsRefWithParam = param => this.database.ref(`/cards/${this.userUid}/${param}`)

  getUserByEMail = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  setUserByEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)
  getUserFromSocial = provider => (provider === 'google')
    ? this.auth.signInWithPopup(this.googleProvider)
    : this.auth.signInWithPopup(this.gitHubProvider)

  setUserCards = cards =>  this.userCards = cards
  exitFromDatabase = () => this.auth.signOut()

  updateSomeThingInToDataBase = (where, instead, what) =>  this.getUserCardsRefWithParam(`${where}/${instead}`).set(what)
  getCurrentCardByUser = id => this.getUserCardsRefWithParam(id)
}

export default Firebase

