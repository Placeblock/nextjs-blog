import { Card } from "@components/card/card";
import { memo } from "react";
import { Post } from "src/posts";
import "./postcard.scss";
import Taglist from "@components/taglist/taglist";
import Link from "next/link";

export default memo(function PostCard({post}: {post: Post}) {
    return <Card className="post-card">
        <Link href={"/"+post.slug} style={{textDecoration: "none"}}>
            <h4 className="post-card-title gradient" dangerouslySetInnerHTML={{__html: post.data.title}}></h4>
            <p className="post-card-description">{post.data.description}</p>
        </Link>
        <div className="post-card-info">
            <Link href={"/"+post.slug} style={{whiteSpace: "nowrap"}}>
                <p className="underlined" style={{margin: "0px"}}>🡒 Mehr lesen</p>
            </Link>
            <Taglist tags={post.data.tags.slice(0, Math.min(3, post.data.tags.length))}/>
        </div>
    </Card>
});