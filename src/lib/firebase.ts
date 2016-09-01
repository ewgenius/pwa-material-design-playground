import * as Firebase from 'firebase'
import {
  initializeApp,
  FirebaseConfig,
  FirebaseApplication,
  Database,
  GoogleAuthProvider
} from 'firebase'
import {Middleware} from 'redux'

export const FIREBASE_ACTION = 'FIREBASE_ACTION'

export interface FirebaseAction {
  path: string
  type: string
  value?: any
  successType: string
  errorType: string
}

export class FirebaseService {
  private _firebase: FirebaseApplication
  private _database: Database
  private _authProvider: GoogleAuthProvider
  private _onSignIn: (any) => any = () => { }

  constructor(config: FirebaseConfig) {
    this._firebase = initializeApp(config)
    this._database = this._firebase.database()
    this._authProvider = new (Firebase as any).auth.GoogleAuthProvider()
  }

  get currentUser() {
    return this._firebase.auth().currentUser
  }

  get middleware(): Middleware {
    return store => next => action => {
      const firebaseAction: FirebaseAction = action[FIREBASE_ACTION]

      if (!firebaseAction)
        return next(action)
      else {
        const {path, type, value, successType, errorType} = firebaseAction
        return Promise.resolve()
          .then(() => {
            switch (type) {
              case 'push':
                return this.push(path, value)
              case 'update':
                return this.update(path, value)
              case 'remove':
                return this.remove(path)
            }
          })
          .then(result => next({
            type: successType,
            result
          }))
          .catch(error => next({
            type: errorType,
            error
          }))
      }
    }
  }

  get database(): Database {
    return this._database
  }

  set onSignIn(handler) {
    this._onSignIn = handler
  }

  sigIn() {
    this._firebase.auth().getRedirectResult().then(result => {
      if (result.user) {
        this._onSignIn(result.user)
      } else {
        return this._firebase.auth().signInWithRedirect(this._authProvider)
      }
    })
  }

  list(path: string, limit: number = 10) {
    return this._database
      .ref(path)
      .orderByKey()
      .limitToLast(limit)
      .once('value')
      .then(result => {
        const data = result.val() || {}
        return Object.keys(data).map(id => ({
          id,
          item: data[id]
        }))
      })
  }

  push(path: string, value: any) {
    return this._database
      .ref(path)
      .push(value)
  }

  update(path: string, value: any) {
    return this._database
      .ref(path)
      .update(value)
  }

  remove(path: string) {
    return this._database
      .ref(path)
      .remove()
  }
}