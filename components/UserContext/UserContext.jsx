import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext(undefined)
export const UserDispatchContext = createContext(undefined)

export function UserWrapper({ children, currentUser, message })
{
    // console.log('currentUser in context: ', currentUser)
    // console.log('message: ', message)
    const [user, setUser] = useState({ data: null, isLoading: true })
    // console.log('USER WRAPPER')
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={setUser}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

// can't use getServerSideProps here because it can only be used with PAGES