import {useCallback, useState} from "react";
import {useMutation} from "@apollo/client/react";
import {CreateUser} from "./qraphql.query.ts";
import type {User} from "./models.ts";

interface UserMutationResponse {
    createUser: User
}

function AddUser() {
    const [name, setName] = useState('');

    const [addUser, {data, loading, error}] = useMutation<UserMutationResponse>(CreateUser, {
        // refetchQueries: [
        //     GET_POST, // DocumentNode object parsed with gql
        //     "GetComments", // Query name
        // ]
    });

    const sendPost = useCallback(async () => {
        try {
            await addUser({
                variables: {
                    input: {
                        name: name,
                        username: name,
                        email: ''
                    }
                }
            });
        } catch (e) {
            console.error("Failed to add user", e);
        }
    }, [addUser, name]);

    return (
        <>
            <h2>AddUser</h2>
            <input placeholder="user name" value={name} onChange={e => setName(e.target.value)}/>
            <button onClick={sendPost}>Send Post</button>

            {loading && <p>Loading...</p>}
            {!!error && <p>Error {error?.name}</p>}

            {data && <>
                <p>New user </p>
                <p><strong>ID:</strong> {data.createUser.id}</p>
                <p><strong>Name:</strong> {data.createUser.name}</p>
            </>}
        </>
    )
}

export default AddUser;
