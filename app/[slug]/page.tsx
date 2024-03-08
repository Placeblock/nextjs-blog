import React from "react";
import { getBlogPostData } from "src/posts";
import Post from "./post";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import TagList from "@components/taglist/taglist";

export const revalidate = 600

export default async function Page({ params }: { params: { slug: string } }) {
    console.log("LOAD POST")
    const slug = decodeURIComponent(params.slug)

    let post = await getBlogPostData(slug);
    if (post == null || !post.data.isPublished) {
        return notFound();
    }

    return <div>
        <Image id="post-banner" src={post.data.banner} width={800} height={300} alt="Banner image" />
        <h1 className="gradient" id="post-title" dangerouslySetInnerHTML={{__html: post.data.title}}></h1>
        <p id="post-publish-date">Published on {post.data.publishedOn.toLocaleString()}</p>
        <TagList tags={post.data.tags}/>
        <hr style={{marginBlock: "40px"}}></hr>
        <Post code={post.code}/>
        <hr style={{marginBlock: "40px"}}></hr>
        <p style={{textAlign: "center"}}><a target="_blank" href={`https://github.com/Placeblock/nextjs-blog/blob/main/posts/${slug}.mdx`}>This post on GitHub</a></p>
        <p style={{textAlign: "center"}}>Written and developed with ♥ by Felix</p>
    </div>
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = decodeURIComponent(params.slug)

    const post = await getBlogPostData(slug);
    if (post == null) {
        return null;
    }

    return {
        title: post.data["title"],
        metadataBase: new URL("https://blog.codelix.de"),
        applicationName: "Codelix - Blog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: post.data["description"],
        openGraph: {
            siteName: "Codelix - Blog",
            title: post.data["title"],
            authors: ["Felix"],
            description: post.data["description"],
            type: "article",
            images: [{
                url: post.data.banner
            }],
            publishedTime: post.data.publishedOn.toISOString()
        }
    }
}

export const dynamic = "force-static"