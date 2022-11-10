import { createContext, useState } from "react";

export const UserContext = createContext(undefined)
export const UserDispatchContext = createContext(undefined)

export function UserWrapper({ children })
{
    const [user, setUser] = useState({ data: null, isLoading: true })
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={setUser}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

// can't use getServerSideProps here because it can only be used with PAGES