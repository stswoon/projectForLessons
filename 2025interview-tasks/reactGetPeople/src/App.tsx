import {memo} from 'react'
import {IssuesWithPagination} from "./IssuesWithPagination.tsx";

function App() {
    return (
        <div className="taApp">
            <IssuesWithPagination/>
        </div>
    )
}

export default memo(App)
