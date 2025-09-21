import {useState} from "react";
import {useQuery} from "@apollo/client/react";
import type {User, Post} from "./models.ts";
import {GET_USER} from "./qraphql.query.ts";


function UserPosts() {
    const [userId, setUserId] = useState<string>('1');

    const {loading, error, data, refetch} = useQuery<{ user: User }>(GET_USER, {
        variables: {id: userId}
    });

    return (
        <>
            <span>ID</span>
            <input value={userId} onChange={(e) => setUserId(e.target.value)}/>
            {loading && <p>Loading...</p>}
            {!!error && <p>Error {error?.name}</p>}
            {<User user={data?.user}/>}
        </>
    )
}

export default UserPosts;

function User({user}: { user?: User }) {
    if (!user) {
        return (<p>No user found.</p>);
    }

    return (
        <div style={{padding: "2rem"}}>
            <h3>User Info</h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address?.geo.lat} {user.address?.geo.lng}</p>
            <ul>
                {user.posts.data.map(post => <Post key={post.id} post={post}/>)}
            </ul>
        </div>
    )
}

function Post({post}: { post: Post }) {
    return <li>{post.title}</li>
}