import { axios11 } from './config'
import { User } from '../../types'

export interface IUserManagement {
    login: () => Promise<User>}

export const UserManagement = (): IUserManagement => {
    const login = async () => {
        const result = (await axios11.post<User>(`/login`)).data
        return result
    }

    return {
        login
    }
}
