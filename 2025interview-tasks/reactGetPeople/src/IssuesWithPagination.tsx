import {type ChangeEvent, memo, useCallback, useState} from 'react'
import {Issues} from "./Issues.tsx";
import {useIssues} from "./useIssues.ts";
import {useDebounceValue} from "./useDebounceValue.ts";

export const IssuesWithPagination = memo(() => {
    // const handleChangeCreator = useCallback((creator: string) => {
    //     setCreator(creator);
    // }, []);

    // const handleChangeCreator = useMemo(() => {
    //     return debounce((creator: string) => setCreator(creator), 1000)
    // }, []);

    // useEffect(() => {
    //     debounce((creator: string) => {
    //         setSearchCreator(creator);
    //     }, 5000)(creator)
    // }, [creator])

    const [creator, setCreator] = useState<string>("");

    const handleCreatorOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const creator = e.target.value;
        setCreator((prevCreator) => {
            console.log(`Previous creator was: ${prevCreator}`);
            return creator;
        });
    }, [setCreator]);

    // const searchCreator = useDebounceValue(creator, 3000);
    const searchCreator = useDebounceValue(creator, 0); // to see how abort works

    const {issues, loading, error, disablePrevious, previousPage, nextPage, disableNext} = useIssues(searchCreator);

    return (
        <>
            <div className="controls">
                <input placeholder="Enter creator full name" type='text' value={creator}
                       onChange={handleCreatorOnChange}/>
                <button disabled={disablePrevious} onClick={previousPage}>Previous</button>
                <button disabled={disableNext} onClick={nextPage}>Next</button>
            </div>

            {loading && (<div>Loading...</div>)}
            {!!error && (<div>Error when loading data</div>)}

            {!loading && !error && (<Issues issues={issues}/>)}
        </>
    )
});
