import { useSystemSetting } from "@/lib/zustand/useSystemSetting"

export const useSystemSettingStore = () => {
    const app_name = useSystemSetting((state) => state.app_name)
    const logo_url = useSystemSetting((state) => state.logo_url)
    const organization_address = useSystemSetting((state) => state.organization_address)
    const tagline = useSystemSetting((state) => state.tagline)
    const wellcome_message_login = useSystemSetting((state) => state.wellcome_message_login)
    const wellcome_message_dashboard = useSystemSetting((state) => state.wellcome_message_dashboard)

    return {app_name, logo_url, organization_address, tagline, wellcome_message_login, wellcome_message_dashboard}
}