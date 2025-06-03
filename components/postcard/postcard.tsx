import { Card } from "@components/card/card";
import { memo } from "react";
import { PostInfo } from "src/posts";
import "./postcard.scss";
import Taglist from "@components/taglist/taglist";
import Link from "next/link";

export default memo(function PostCard({post}: {post: PostInfo}) {
    return <Card className="post-card">
        <Link href={"/"+post.slug} style={{textDecoration: "none"}}>
            <h4 className="post-card-title gradient" dangerouslySetInnerHTML={{__html: post.data.title}}></h4>
            <p className="post-card-description">{post.data.description}</p>
        </Link>
        <div className="post-card-info">
            <Link href={"/"+post.slug} style={{whiteSpace: "nowrap"}}>
                <p className="underlined" style={{margin: "0px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="read-more-arrow" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    Mehr lesen
                </p>
            </Link>
            <Taglist tags={post.data.tags.slice(0, Math.min(3, post.data.tags.length))}/>
        </div>
    </Card>
});
