import * as Firebase from 'firebase'
import {
  initializeApp,
  FirebaseConfig,
  FirebaseApplication,
  GoogleAuthProvider
} from 'firebase'

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

  sigIn() {
    return this.firebase.auth().signInWithPopup(this.authProvider)
  }
}