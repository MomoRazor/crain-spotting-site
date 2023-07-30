import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User as FirebaseUser,
    UserCredential,
    getAuth,
    IdTokenResult,
    signInAnonymously
} from 'firebase/auth'
import { User } from '../types'
import { useApi } from './api/ApiProvider'
import { useSnackbar } from '@sector-eleven-ltd/cosmos-core'
import { NEXT_PUBLIC_API_KEY } from '@/enviornment'

let fbToken: IdTokenResult | undefined

const firebaseOptions: FirebaseOptions = {
    apiKey: NEXT_PUBLIC_API_KEY
}

const firebaseApp = initializeApp(firebaseOptions)
export const firebaseAuth = getAuth(firebaseApp)
// export const firebaseDb = getFirestore(firebaseApp)

export const getFirebaseToken = async () => {
    try {
        const user = firebaseAuth.currentUser

        if (user) {
            if (!fbToken || new Date(fbToken.expirationTime).getTime() < Date.now()) {
                return await user.getIdTokenResult(true)
            }

            return fbToken
        } else {
            return null
        }
    } catch (e) {
        console.error(e)
        return
    }
}

export interface IFirebaseAuthContext {
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    user: User | undefined
}

export const FirebaseAuthContext = createContext<IFirebaseAuthContext | undefined>(undefined)

export interface IFirebaseAuthProvider {
    children: ReactNode
}

export const FirebaseAuthProvider = (props: IFirebaseAuthProvider) => {
    const [user, setUser] = useState<User>()

    const { displaySnackbar } = useSnackbar()
    const { userManagement } = useApi()
    const [checkLoginFlag, setCheckLoginFlag] = useState(false)

    const logout = useCallback(async () => {
        await firebaseAuth.signOut()
    }, [])

    const getUser = useCallback(async () => {
        let user = await userManagement.login()

        if (user) {
            setUser(user)
        } else {
            return false
        }

        return true
    }, [setUser, userManagement])

    const checkLogin = useCallback(
        async (user: FirebaseUser | null) => {
            if (!user) {
                console.log('Anon sign in!')
                setUser(undefined)
                await signInAnonymously(firebaseAuth)
            } else {
                if (!user.isAnonymous) {
                    try {
                        const result = await getUser()
                        if (!result) {
                            displaySnackbar('No Client found', 'error')
                            await logout()
                        } else {
                            displaySnackbar('Welcome back!', 'success')
                        }
                    } catch (e) {
                        displaySnackbar('Error getting Client', 'error')
                        await logout()
                    }
                }
            }
            setCheckLoginFlag(true)
        },
        [getUser, logout, displaySnackbar]
    )

    const login = async (email: string, password: string) => {
        return await signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    useEffect(() => {
        const listenerCleaner = onAuthStateChanged(firebaseAuth, (user) => {
            checkLogin(user)
        })

        return () => {
            listenerCleaner()
        }
    }, [checkLogin])

    return (
        <FirebaseAuthContext.Provider
            value={{
                login,
                logout,
                user,
            }}
        >
            {checkLoginFlag ? props.children : <></>}
        </FirebaseAuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(FirebaseAuthContext)

    if (!ctx) {
        throw new Error('Auth Context not found!')
    }

    return ctx
}
