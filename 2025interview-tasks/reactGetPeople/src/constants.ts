export const ITEMS_PER_PAGE = 10;

export const START_PAGE = 1;

export const getHelloWorldGithubIssuesUrl = (pageNumber: number, creator?: string) => {
    creator = creator?.trim();
    creator = creator?.length === 0 ? undefined : creator;

    return `https://api.github.com/repos/octocat/Hello-World/issues?per_page=${ITEMS_PER_PAGE}&page=${pageNumber}` +
        (creator ? `&creator=${creator}` : "");
}