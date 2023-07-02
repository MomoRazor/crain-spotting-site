import axios from 'axios'
import { getFirebaseToken } from '../FirebaseAuthProvider'
import { REACT_APP_API_URL } from '@/enviornment'

const authHeaders = async () => {
    let token = await getFirebaseToken()

    if (token) {
        return {
            authorization: `Bearer ${token.token}`
        }
    } else {
        return
    }
}

export const axios11 = axios.create({
    baseURL: REACT_APP_API_URL
})

axios11.interceptors.request.use(async (config) => {
    try {
        const newHeaders: any = await authHeaders()
        if (newHeaders) {
            config.headers = newHeaders
        }

        return config
    } catch (e) {
        console.error('Failed to get Token')
        return config
    }
})

axios11.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response?.status === 401) {
            return Promise.reject(error)
        } else {
            return Promise.reject(error)
        }
    }
)
