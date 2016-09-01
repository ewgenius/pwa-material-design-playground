import * as Firebase from 'firebase'
import {
  initializeApp,
  FirebaseConfig,
  FirebaseApplication,
  Database,
  GoogleAuthProvider,
  User
} from 'firebase'
import {Middleware} from 'redux'

export const FIREBASE_DATABASE_ACTION = 'FIREBASE_DATABASE_ACTION'
export const FIREBASE_AUTH_ACTION = 'FIREBASE_AUTH_ACTION'

export interface FirebaseDatabaseAction {
  path: string
  type: string
  value?: any
  successType: string
  errorType: string
}

export interface FirebaseAuthAction {
  successType: string
  errorType: string
}

export class FirebaseService {
  private _firebase: FirebaseApplication
  private _database: Database
  private _authProvider: GoogleAuthProvider

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
      const firebaseDatabaseAction: FirebaseDatabaseAction = action[FIREBASE_DATABASE_ACTION]
      const firebaseAuthAction: FirebaseAuthAction = action[FIREBASE_AUTH_ACTION]

      if (firebaseDatabaseAction) {
        const {path, type, value, successType, errorType} = firebaseDatabaseAction
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
      } else if (firebaseAuthAction) {
        const {successType, errorType} = firebaseAuthAction
        return this.sigIn()
          .then(user => {
            next({
              type: successType,
              user
            })
          })
          .catch(error => {
            next({
              type: errorType,
              error
            })
          })
      } else return next(action)
    }
  }

  get database(): Database {
    return this._database
  }

  sigIn(): Promise<User> {
    return this._firebase.auth().getRedirectResult().then(result => {
      console.log(result)
      if (result.user) {
        return result.user
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