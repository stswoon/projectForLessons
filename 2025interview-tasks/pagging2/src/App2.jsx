import {useCallback, useEffect, useRef, useState} from "react";

const LIMIT = 10;
const DELAY = 2000;
const getUrl = (query, page) => {
    const skip = (page - 1) * LIMIT;
    return `https://dummyjson.com/users/search?q=${query}&limit=${LIMIT}&skip=${skip}&delay=${DELAY}`;
}
// https://dummyjson.com/users/search?q=&limit=10&skip=0&delay=2000
export default function App() {
    return (
        <div className="taApp">
            <SearchUsers/>
        </div>
    );
}

//TODO move consts to context, ts

const DEFAULT_DEBOUNCE_DELAY = 500;

function useDebounce(value, delay = DEFAULT_DEBOUNCE_DELAY) {
    const [debouncedValue, setDebouncedValue] = useState(undefined);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);
    return debouncedValue;
}

function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const ABORT_MESSAGE = "Abort request due to new inputs";

function useUsers(query) {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const prevQuery = usePrevious(query);

    useEffect(() => {
        // if (query === undefined || query === null) {
        //     return;
        // }

        if (prevQuery !== query && page !== 1) {
            console.log("Query changed so set page to 1");
            setPage(1);
            setMaxPage(0);
            return; //no need to do anything because of setPage(1) fetch will be called in next tick
        }

        const abortController = new AbortController();

        async function getUsers() {
            try {
                setError(undefined);
                setLoading(true);
                const url = getUrl(query, page);
                console.log(`Request to url = ${url}`);
                const res = await fetch(url, {signal: abortController.signal});
                if (res.status >= 400) {
                    throw new Error(`Bad response status ${res.status}`)
                }
                const data = await res.json();
                const maxPage = Math.max(0, Math.ceil(data.total / LIMIT));
                setMaxPage(maxPage);
                const users = convertToUsers(data);
                setUsers(users);
                setLoading(false);
            } catch (e) {
                if (e === ABORT_MESSAGE) {
                    console.log("Abort Error is a normal flow so skip this error");
                } else {
                    console.error("Failed to get users, cause: ", e);
                    setError(e);
                    setLoading(false);
                }
            }
            // finally {
            //     setLoading(false);
            // }
        }

        getUsers();

        return () => {
            console.log(ABORT_MESSAGE);
            abortController.abort(ABORT_MESSAGE)
        }
    }, [query, page]);

    const changePage = useCallback((newPage) => {
        if (loading) {
            return;
        } else if (newPage === page) {
            return;
        } else if (newPage < 0) {
            return;
        } else if (newPage > maxPage) {
            return;
        } else {
            setPage(newPage);
        }
    }, [page, maxPage, loading]);

    // const publicPage = loading ? 0 : page;
    const publicPage = page;
    // const publicMaxPage = loading ? 0 : maxPage;
    const publicMaxPage = maxPage;

    return {
        users, loading, error,
        page: publicPage, maxPage: publicMaxPage, changePage
    }
}

function SearchUsers() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);

    const handleChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    const {
        users,
        loading, error,
        page, maxPage, changePage
    } = useUsers(debouncedQuery ?? "");

    return (
        <div className="taSearchUsers">
            <div style={{display: "flex", gap: "4px"}}>
                <input value={query} onChange={handleChange}/>
                <button disabled={page <= 1} onClick={() => changePage(page - 1)}>Previous</button>
                <span>{page}/{maxPage}</span>
                <button disabled={page >= maxPage} onClick={() => changePage(page + 1)}>Next</button>
            </div>
            <UserList loading={loading} hasError={!!error} users={users}/>
        </div>
    );
}


function UserList({loading, hasError, users}) {
    if (loading) {
        return (<div>Loading...</div>)
    }

    if (hasError) {
        return (<div>Error</div>)
    }

    if (users.length === 0) {
        return (<div>Not Found Users</div>)
    }

    return (
        <ul>
            {users.map(({id, firstName, lastName}) => <li key={id}>{firstName} <b>{lastName}</b></li>)}
        </ul>
    )
}

function convertToUsers(rawData) {
    return rawData.users.map(({id, firstName, lastName}) => ({id, firstName, lastName}));
}



