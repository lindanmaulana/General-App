"use client"

import { useDemo } from "@/lib/zustand/useDemo"

export const useDemoStore = () => {
    const id = useDemo((state) => state.id)
    const label = useDemo((state) => state.label)
    const handleSetActiveView = useDemo((state) => state.setActiveView)


    return {id, label, handleSetActiveView}
}