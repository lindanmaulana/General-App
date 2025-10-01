const all = ["settins"] as const

export const settingsKeys = {
    system: {
        lists: () => [...all, 'system', 'lists'],
    },
    pdf_document: {
        lists: () => [...all, "pdf-document", "lists"]
    }
}