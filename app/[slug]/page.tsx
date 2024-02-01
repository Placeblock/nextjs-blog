import React from "react";
import { getBlogPostData } from "src/posts";
import Post from "./post";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 30

export default async function Page({ params }: { params: { slug: string } }) {
    console.log("LOAD POST")
    const slug = decodeURIComponent(params.slug)

    const post = await getBlogPostData(slug);

    if (!post.data.isPublished) {
        return notFound();
    }

    return <div>
        <h1 className="gradient" id="post-title">{post.data.title}</h1>
        <p id="post-publish-date">Published on {post.data.publishedOn.toLocaleString()}</p>
        <hr style={{marginBlock: "50px"}}></hr>
        <Post code={post.code}/>
        <hr style={{marginBlock: "50px"}}></hr>
        <p style={{textAlign: "center"}}>Written with ♥ by Felix</p>
    </div>
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = decodeURIComponent(params.slug)

    const post = await getBlogPostData(slug);

    return {
        title: post.data["title"],
        metadataBase: new URL("https://blog.codelix.de"),
        applicationName: "CodelixBlog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: post.data["description"],
        openGraph: {
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