import { memo } from "react";
import "./tag.scss";
import Link from "next/link";

export default memo(function Tag({tag}: {tag: string}) {
    return <Link className="tag" href={`/tags/${tag}`}>
        {tag.charAt(0).toUpperCase() + tag.slice(1)}    
    </Link>
})