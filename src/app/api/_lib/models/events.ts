export interface events {
    id: string
    code: string
    name: string
    description: string
    date: Date
    status: string
    budget: string
    is_public: boolean
    created_at: Date;
    updated_at: Date;
}

export interface eventsCreateRequest {
    code: string
    name: string
    description?: string
    date?: Date
    status: string
    budget?: string
    is_public: boolean
}

export interface eventsUpdateRequest {
    code: string
    name: string
    description?: string
    date?: Date
    status: string
    budget?: string
    is_public: boolean
}