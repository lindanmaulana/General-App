const all = ["settins"] as const

export const settingsKeys = {
    system: {
        lists: () => [...all, 'system', 'lists'],
    }
}