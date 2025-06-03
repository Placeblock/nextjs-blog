import React from "react";
import { getPost, getPostMeta } from "src/posts";
import Post from "./post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import TagList from "@components/taglist/taglist";

export const revalidate = 600

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    console.log("LOAD POST2")
    const syncParams = await params
    const slug = decodeURIComponent(syncParams.slug)

    let post = await getPost(slug);
    if (post == null || !post.metadata.isPublished) {
        return notFound();
    }

    return <div>
        <Image id="post-banner" src={post.metadata.banner} width={800} height={300} alt="Banner image" />
        <h1 className="gradient" id="post-title" dangerouslySetInnerHTML={{__html: post.metadata.title}}></h1>
        <p id="post-publish-date">Published on {post.metadata.publishedOn.toLocaleString()}</p>
        <TagList tags={post.metadata.tags}/>
        <hr style={{marginBlock: "40px"}}></hr>
        <Post source={post.content}/>
        <hr style={{marginBlock: "40px"}}></hr>
        <p style={{textAlign: "center"}}><a target="_blank" href={`https://github.com/Placeblock/nextjs-blog/blob/main/posts/${slug}.mdx`}>This post on GitHub</a></p>
        <p style={{textAlign: "center"}}>Written and developed with ♥ by Felix</p>
    </div>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const syncParams = await params
    const slug = decodeURIComponent(syncParams.slug)

    const data = await getPostMeta(slug);

    return {
        title: data["title"],
        metadataBase: new URL("https://blog.codelix.de"),
        applicationName: "Codelix - Blog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: data.description,
        openGraph: {
            siteName: "Codelix - Blog",
            title: data.title,
            authors: ["Felix"],
            description: data.description,
            type: "article",
            images: [{
                url: data.banner
            }],
            publishedTime: data.publishedOn.toISOString()
        }
    }
}

export const dynamic = "force-static"
