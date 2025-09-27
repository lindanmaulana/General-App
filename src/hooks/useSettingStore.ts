import { systemSettingListOptions } from "@/lib/queries/settings/systemSettingListOptions"
import { useSystemSetting } from "@/lib/zustand/useSystemSetting"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useSettingStore = () => {
    const handleSetState = useSystemSetting((state) => state.setState)
    
    const {data} = useQuery(systemSettingListOptions())

    useEffect(() => {
        if(data) handleSetState(data)
    }, [data, handleSetState])

    return null
}