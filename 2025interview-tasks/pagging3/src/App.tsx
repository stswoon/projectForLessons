import {
    type ChangeEvent,
    createContext,
    type FC,
    memo,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

function App() {
    return (
        <div className="taApp">
            <ThemeProvider initTheme={'dark'}>
                <SearchUsers/>
            </ThemeProvider>
        </div>
    )
}

export default memo(App);

//-----REST API

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const LIMIT = 10;
const API_DELAY = 2000;

function getUrl(query: string, page: number): string {
    const skip = (page - 1) * LIMIT;
    return `https://dummyjson.com/users/search?q=${query}&limit=${LIMIT}&skip=${skip}&delay=${API_DELAY}`;
}

function convertToUsers(rawData: unknown): { users: User[], totalPages: number } {
    const data = rawData as { users: User[], total: number };
    const users = data.users.map(({id, firstName, lastName}) => ({id, firstName, lastName}));
    const totalPages = Math.ceil(data.total / LIMIT);
    return {users, totalPages}
}

//-----Logic

const SearchUsers: FC = memo(() => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);

    const {users, error, loading, totalPages, setPage, page} = useUsers(debouncedQuery);
    console.log(users, error, loading)

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value);
        setQuery(e.target.value);
    }, []);
    const handleClickNext = useCallback(() => setPage(page + 1), [page, setPage]);
    const handleClickPrev = useCallback(() => setPage(page - 1), [page, setPage]);

    const {theme, toggleTheme} = useThemeContext();

    return (
        <div
            className="taSearchUsers"
            style={{backgroundColor: theme === 'dark' ? "gray" : undefined}}
        >
            <button onClick={toggleTheme}>Switch to {theme === 'dark' ? "light" : "dark"}</button>

            <div className="taControls">
                <input
                    placeholder="Find by name"
                    value={query}
                    onChange={handleSearchChange}
                />

                <button onClick={handleClickPrev} disabled={page <= 1}>Prev</button>
                <span>{page}/{totalPages}</span>
                <button onClick={handleClickNext} disabled={page >= totalPages}>Next</button>
            </div>

            <UserList users={users} loading={loading} hasError={!!error}/>
        </div>
    )
});

interface UseUsersResult {
    users: User[];
    totalPages: number;
    page: number;

    loading: boolean;
    error: unknown;

    setPage: (page: number) => void;
}

function useUsers(query: string): UseUsersResult {
    const ABORT_REASON = "Old request not actual";

    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    const [page, setPage] = useState(1);
    const setPageWrapper = useCallback((newPage: number) => {
        if (newPage != page && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }, [page, totalPages])


    const previousQuery = usePrevious(query);


    useEffect(() => {
        if (previousQuery !== query && page !== 1) {
            console.log("query change, clear page");
            setPage(1);
            return; // finish this run because setPage(1) will call it again so we will have 1 request
        }

        const controller = new AbortController();

        async function makeRequest() {
            try {
                setLoading(true);
                setUsers([]);
                setError(undefined);

                const url = getUrl(query, page);
                console.log("request url=", url);
                const response = await fetch(url, {signal: controller.signal});
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                const rawData = await response.json();
                const data = convertToUsers(rawData);
                setUsers(data.users);
                setTotalPages(data.totalPages ?? 1);
                setLoading(false);
            } catch (e) {
                //console.log("Error name=", e.name);
                //if (e.name === "AbortError") {
                if (e === ABORT_REASON) {
                    console.log("Abort Error, normal flow, so skip error");
                    //no need make loading false because it continues
                } else {
                    console.error("Failed to load users:", e);
                    setError(e);
                    setLoading(false);
                }
            } finally {
                //no need call setLoading(false) because of abort case, need continue loading for other request
            }
        }

        makeRequest().catch((error) => console.error("UnexpectedError", error));


        return () => {
            //abort if query or page changed, so old in progress fetch is not actual anymore
            console.log("abort");
            controller.abort(ABORT_REASON);
        };
    }, [page, previousQuery, query]);


    return {users, totalPages, loading, error, page, setPage: setPageWrapper}

}

const UserList: FC<{ hasError: boolean, loading: boolean, users: User[] }> = memo(({hasError, loading, users}) => {
    let result;
    if (loading) {
        result = (<div>Loading...</div>);
    } else if (hasError) {
        result = (<div>Failed to load users</div>);
    } else if (users.length === 0) {
        result = (<div>No users found</div>);
    } else {
        result = (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <span>{user.firstName}</span>
                        <span>&nbsp;</span>
                        <b>{user.lastName}</b>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="taUserList">
            {result}
        </div>
    )
});

//-----Context

type ThemeContextProps = {
    theme: ThemeType
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

type ThemeType = 'dark' | 'light';

interface ThemeProviderProps {
    initTheme: ThemeType;
    children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({initTheme, children}) => {
    const [theme, setTheme] = useState(initTheme);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('Use ThemeContext within provider!');
    return context;
}

//-----Utils

const DEFAULT_DEBOUNCE_DELAY = 500;

function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current
}

function useDebounce<T>(value: T, delay: number = DEFAULT_DEBOUNCE_DELAY) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => clearTimeout(timeoutId);
    }, [value, delay]);
    return debouncedValue;
}