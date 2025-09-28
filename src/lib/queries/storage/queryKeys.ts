const all = ["storage"] as const

export const storageKeys = {
    logo: {
        lists: () => [...all, "logo"]
    }
}