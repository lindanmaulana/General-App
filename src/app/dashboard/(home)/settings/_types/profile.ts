export type Users = {
    id: string
    name: string | null
    email: string
    role: "ADMIN" | "MEMBER"
    image: string | ""
}

    // interface Session {
    //     user: {        
    //         id: string
    //         name: string?;
    //         email: string
    //         role: "ADMIN" | "MEMBER" 
    //         image: string | ""
    //     }
    // }