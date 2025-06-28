import {memo, useEffect, useState} from 'react'
import {Issues} from "./Issues.tsx";
import {useIssues} from "./useIssues.ts";
import {debounce} from "./utils.ts";

//TODO: move to separate component
function App() {
    // const handleChangeCreator = useCallback((creator: string) => {
    //     setCreator(creator);
    // }, []);

    // const handleChangeCreator = useMemo(() => {
    //     return debounce((creator: string) => setCreator(creator), 1000)
    // }, []);

    const [creator, setCreator] = useState<string>("");
    const [searchCreator, setSearchCreator] = useState<string>(creator);
    const {issues, loading, error, disablePrevious, previousPage, nextPage, disableNext} = useIssues(searchCreator);

    //TODO: debounce
    useEffect(() => {
        debounce((creator: string) => {
            setSearchCreator(creator)
        }, 1000)(creator)
    }, [creator])

    return (
        <div className="App">
            <div className="controls">
                <input type='text' value={creator} onChange={(e) => setCreator(e.target.value)}/>
                <button disabled={disablePrevious} onClick={previousPage}>Previous</button>
                <button disabled={disableNext} onClick={nextPage}>Next</button>
            </div>

            {loading && (<div>Loading...</div>)}
            {!!error && (<div>Error when loading data</div>)}

            {!loading && !error && (<Issues issues={issues}/>)}
        </div>
    )
}

export default memo(App)
