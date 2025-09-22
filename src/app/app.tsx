"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {AnimatePresence} from "motion/react"

interface AppProps {
    children: ReactNode
}

const App = ({children}: AppProps) => {
    const [client] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    }))

    return (
        <QueryClientProvider client={client}>

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            )}
            <AnimatePresence mode="wait">
                {children}
            </AnimatePresence>
        </QueryClientProvider>
    )
}

export default App