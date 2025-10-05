type StatusEvent = 'code' | 'name' | 'description' | 'date' | 'status' | 'budget' | 'is_public';

export interface Events {
    id: string
    code: string
    name: string
    description?: string
    date?: string
    status: StatusEvent
    budget?: string
    is_public: boolean
}