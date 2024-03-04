import { memo } from "react";
import { Post } from "src/posts";
import PostCard from "@components/postcard/postcard";

export default memo(function Tag({posts}: {posts: Post[]}) {
    return <div className="post-list">
        {posts.filter(p => p.data.isPublished).map((p, i) => <PostCard post={p} key={i}/>)}
    </div>
})