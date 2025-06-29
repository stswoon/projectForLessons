export const ITEMS_PER_PAGE = 10;

export const START_PAGE = 1;

//https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
export const getHelloWorldGithubIssuesUrl = (pageNumber: number, creator?: string) => {
    creator = creator?.trim();
    creator = creator?.length === 0 ? undefined : creator;

    return `https://api.github.com/repos/octocat/Hello-World/issues?per_page=${ITEMS_PER_PAGE}&page=${pageNumber}` +
        (creator ? `&creator=${creator}` : "");
}