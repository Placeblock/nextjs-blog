import { ReactNode, memo } from "react";
import { Card } from "./card/card";

export default memo(function Details({summary, children}: {summary: string, children: ReactNode}) {
    return <Card>
        <details>
            <summary>{summary}</summary>
            {children}
        </details>
    </Card>
})