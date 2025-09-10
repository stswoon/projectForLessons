import {useState, useEffect, useCallback, useRef} from "react";

export default function App() {
    return (
        <div className="App">
            <SearchUsers/>
        </div>
    );
}

function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

function useUsers(query) {
    const limit = 10;
    const delay = 2000;
    const abortReason = "Old request not actual";

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const previousQuery = usePrevious(query);

    useEffect(() => {
        if (previousQuery !== query && page !== 1) {
            console.log("query change, clear page");
            setPage(1);
            return; // finish this run because setPage(1) will call it again so we will have 1 request
        }

        const controller = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setUsers([]);
                const skip = (page - 1) * limit;
                const url = `https://dummyjson.com/users/search?q=${query}&limit=${limit}&skip=${skip}&delay=${delay}`;
                console.log("request url=", url);
                const response = await fetch(url, {signal: controller.signal});
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setUsers(data.users);
                setTotalPages(Math.ceil(data.total / limit) || 1);
                setLoading(false);
            } catch (e) {
                //console.log("Error name=", e.name);
                //if (e.name === "AbortError") {
                if (e === abortReason) {
                    console.log("Abort Error, normal flow, so skip error");
                } else {
                    console.error("Failed to load users:", e);
                    setError(e);
                    setLoading(false);
                }
            } finally {
                //setLoading(false); because of abort case, need continue loading for other request
            }
        })();

        return () => {
            //abort if query or page changed, so old in progress fetch is not actual anymore
            console.log("abort");
            controller.abort(abortReason);
        };
    }, [query, page]);

    return {
        users,
        error,
        loading,

        totalPages,
        setPage,
        page,
    };
}

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            //delay=1000 works, delay=500 show first and last value if press only one key, not an issue if click on different keys
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

function SearchUsers() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);
    const {users, error, loading, totalPages, setPage, page} =
        useUsers(debouncedQuery);

    console.log(users, error, loading)

    const handleSearchChange = useCallback((e) => {
        //console.log(e.target.value);
        setQuery(e.target.value);
    }, []);

    const handleClickNext = useCallback(() => setPage(page + 1), [page, setPage]);
    const handleClickPrev = useCallback(() => setPage(page - 1), [page, setPage]);

    return (
        <div className="SearchUsers">
            <input
                placeholder="Find by name"
                value={query}
                onChange={handleSearchChange}
            />

            <button onClick={handleClickPrev} disabled={page <= 1}>
                Prev
            </button>
            <span>{page}/{totalPages}</span>
            <button onClick={handleClickNext} disabled={page >= totalPages}>
                Next
            </button>

            <UserList users={users} loading={loading} hasError={!!error}/>
        </div>
    );
}

function UserList({hasError, loading, users}) {
    if (loading) {
        return (
            <div className="UserList">
                <div>Loading...</div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="UserList">
                <div>Failed to load users</div>
            </div>
        );
    }

    return (
        <div className="UserList">
            {!users.length && <div>No users found</div>}

            {!!users.length && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <span>{user.firstName}&nbsp;</span>
                            <b>{user.lastName}</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
