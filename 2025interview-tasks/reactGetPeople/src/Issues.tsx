import {type FC, memo} from "react";
import type {Issue} from "./models.ts";

export interface IssuesProps {
    issues: Issue[];
}

export const Issues: FC<IssuesProps> = memo(({issues}) => {
    if (issues.length === 0) {
        return (<div>No items</div>)
    }

    return (
        <ul className="taIssues">
            {issues.map(issue => {
                return (
                    <li key={issue.url}>
                        <span>{issue.title}</span>
                        <span>{" (creator: "}<b>{issue.user}</b>{")"}</span>
                    </li>
                )
            })}
        </ul>
    )
});
