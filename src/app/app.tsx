"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

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
            {children}

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} position="right" />
            )}
        </QueryClientProvider>
    )
}

export default App