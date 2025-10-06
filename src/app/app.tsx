"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AnimatePresence } from "motion/react"
import { ReactNode, useState } from "react"
import { SystemSetting } from "./system-setting"

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

            {process.env.NODE_ENV === "production" && (
                <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            )}
            <AnimatePresence mode="wait">
                <SystemSetting>
                    {children}
                </SystemSetting>
            </AnimatePresence>
        </QueryClientProvider>
    )
}

export default App