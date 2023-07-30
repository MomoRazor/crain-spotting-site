import { createContext, FunctionComponent, ReactNode, useContext } from 'react'
import { IUserManagement, UserManagement } from './user-management'
import { CraneManagement, ICraneManagement } from './crane-management'

const userManagement = UserManagement()
const craneManagement = CraneManagement()

const ApiContext = createContext<
    | {
          userManagement: IUserManagement
          craneManagement: ICraneManagement
      }
    | undefined
>(undefined)

export interface ApiProviderProps {
    children: ReactNode
}

export const ApiProvider: FunctionComponent<ApiProviderProps> = (props) => (
    <ApiContext.Provider
        value={{
            userManagement,
            craneManagement
        }}
    >
        {props.children}
    </ApiContext.Provider>
)

export const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('Failed to load Apis!')
    }
    return context
}
