import {useCallback, useEffect, useMemo, useState} from "react";
import {getHelloWorldGithubIssuesUrl, ITEMS_PER_PAGE, START_PAGE} from "./constants.ts";
import {convertResponseToStructure} from "./utils.ts";
import type {Issue} from "./models.ts";

export function useIssues(creator: string) {
    const [page, setPage] = useState<number>(START_PAGE);

    useEffect(() => setPage(START_PAGE), [creator]);

    useEffect(() => {
        (async () => {
            try {
                setIssues([]);
                setLoading(true);
                const url = getHelloWorldGithubIssuesUrl(page, creator);
                //TODO: cancel
                const response = await fetch(url);
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                // await timeout(2000);
                // throw new Error("test")
                console.info("Data loaded");
                // console.log(data);
                const issues = convertResponseToStructure(data);
                setIssues(issues);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [page, creator])

    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>(false);

    const nextPage = useCallback(() => setPage(page + 1), [page])
    const previousPage = useCallback(() => setPage(page - 1), [page])
    const disableNext = useMemo(() => loading || issues.length < ITEMS_PER_PAGE, [page, loading])
    const disablePrevious = useMemo(() => loading || page === START_PAGE, [page, loading])

    return {
        issues,
        error,
        loading,
        nextPage,
        previousPage,
        disableNext,
        disablePrevious,
    }
}