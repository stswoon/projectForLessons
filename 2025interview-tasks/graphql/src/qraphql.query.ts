import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
            email

            address {
                geo {
                    lat
                    lng
                }
            }


            posts {
                data {
                    ...PostItem
                }
            }
        }
    }

    fragment PostItem on Post {
        id
        title
    }
`;

export const CreateUser = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
        }   
    }
`;