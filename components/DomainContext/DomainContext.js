import { useState, createContext } from "react"

export const DomainContext = createContext(process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://localhost:8000')
export const DomainContextDispatch = createContext(undefined)

export function DomainWrapper({ children })
{
    const [domain, setDomain] = useState(process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://localhost:8000')
    return (
        <DomainContext.Provider value={domain}>
            <DomainContextDispatch.Provider value={setDomain}>
                {children}
            </DomainContextDispatch.Provider>
        </DomainContext.Provider>
    )
}
