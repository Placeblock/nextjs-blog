import Link from "next/link";
import { Post, getBlogPostsMeta } from "src/posts";
import { Card } from "@components/card/card";
import { memo } from "react";
import "./style.scss";

export const revalidate = 60

export default async function Page() {
    const posts = await getBlogPostsMeta();
    return <div>{ 
        posts.filter(p => p.data.isPublished).map((p, i) => <Link href={p.slug}>
            <PostCard post={p} />
        </Link>)
    }</div>
}

const PostCard = memo(({post}: {post: Post}) => {
    return <Card className="post-card">
        <h4 className="post-list-title gradient">{post.data.title}</h4>
        <p className="post-list-description">{post.data.description}</p>
    </Card>
});