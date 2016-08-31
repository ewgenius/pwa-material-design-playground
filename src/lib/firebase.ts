import * as Firebase from 'firebase'
import {
  initializeApp,
  FirebaseConfig,
  FirebaseApplication,
  GoogleAuthProvider
} from 'firebase'
import {Middleware} from 'redux'

export const FIREBASE_ACTION = 'FIREBASE_ACTION'

export class FirebaseService {
  private firebase: FirebaseApplication
  private authProvider: GoogleAuthProvider

  constructor(config: FirebaseConfig) {
    this.firebase = initializeApp(config)
    this.authProvider = new (Firebase as any).auth.GoogleAuthProvider()
  }

  get currentUser() {
    return this.firebase.auth().currentUser
  }

  get middleware(): Middleware {
    return store => next => action => {
      console.log(action, this.firebase)
      next(action)
    }
  }

  sigIn() {
    this.firebase.auth().getRedirectResult().then(result => {
      console.log(result)
      if (result.user) {

      } else {
        return this.firebase.auth().signInWithRedirect(this.authProvider)
      }
    })
  }
}