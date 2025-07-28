import { ReactNode, createContext, useContext } from "react"
import { Button, ButtonProps } from "./button/Button"

const GlobalComponentContext = createContext()

export function GlobalComponentProvider ({children}: {children: ReactNode}) {
    const globalComponents = {
        Button: (props: ButtonProps) => <Button {...props}/>
    }

    return (
        <GlobalComponentContext.Provider value={globalComponents}>
            {children}
        </GlobalComponentContext.Provider>
    )
}

export function useGlobalComponents() {
    return useContext(GlobalComponentContext)
}