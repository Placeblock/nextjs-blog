import { ReactNode, memo } from "react";

export default memo(function Details({summary, children}: {summary: string, children: ReactNode}) {
    return <details>
        <summary>{summary}</summary>
        {children}
    </details>
})