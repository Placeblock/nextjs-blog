import { memo } from "react";
import "./taglist.scss";
import Tag from "@components/tag/tag";

export default memo(function TagList({tags}: {tags: string[]}) {
    return <ul className="tag-list">
        {tags.map((t, i) => <Tag tag={t} key={i}/>)}
    </ul>
})