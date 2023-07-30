import { axios11 } from './config'
import { Crane } from '../../types'

export interface CreateCrane extends Partial<Omit<Crane, 'imageUrl' |  'createdOn' | 'createdBy'>> {
    base64Images: {
        [key: string]: string
    }
}

export interface ICraneManagement {
    registerCrane: (crane: CreateCrane) => Promise<Crane>}

export const CraneManagement = (): ICraneManagement => {
    const registerCrane = async (crane: CreateCrane) => {
        const result = (await axios11.post<Crane>(`/create/cranes`, crane)).data
        return result
    }

    return {
        registerCrane
    }
}
