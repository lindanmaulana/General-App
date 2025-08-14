export interface EventsCreateRequest {
    code: string
    name: string
    description?: string
    date?: Date
    status: string
    budget?: string
    is_public: boolean
}