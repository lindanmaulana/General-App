const all = ["settins"] as const

export const settingsKeys = {
    system: {
        branding: {
            get: () => [...all, "system", "branding", "get"],
        }
    }
}