import Link from "next/link";
import { Post, getBlogPostsMeta } from "src/posts";
import { Card } from "@components/card/card";
import { memo } from "react";
import { Metadata } from "next";
import "./style.scss";

export const revalidate = 60

export default async function Page() {
    console.log("GET PAGES LIST")
    const posts = await getBlogPostsMeta();
    return <div>{ 
        posts.filter(p => p.data.isPublished).map((p, i) => <Link href={p.slug}>
            <PostCard key={i} post={p} />
        </Link>)
    }</div>
}

const PostCard = memo(({post}: {post: Post}) => {
    return <Card className="post-card">
        <h4 className="post-list-title gradient">{post.data.title}</h4>
        <p className="post-list-description">{post.data.description}</p>
    </Card>
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Codelix - Blog",
        metadataBase: new URL("https://blog.codelix.de"),
        applicationName: "CodelixBlog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: "Hey hey, it is me, Felix! This is my blog where I share interesting things with you. Come take a look!",
        openGraph: {
            title: "Codelix - Blog",
            description: "Hey hey, it is me, Felix! This is my blog where I share interesting things with you. Come take a look!",
            type: "website",
            images: [{
                url: "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"
            }]
        }
    }
}