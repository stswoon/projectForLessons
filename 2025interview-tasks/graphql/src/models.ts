export interface User {
    id: string;
    name: string;
    email: string;

    address?: Address;

    posts: {
        data: Post[];
    }
}

export interface Address {
    geo: {
        lat: number
        lng: number
    }
}

export interface Post {
    id: string
    title: string
}
