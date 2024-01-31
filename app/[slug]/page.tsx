import React from "react";
import { getBlogPostData } from "lib/posts";
import Post from "./post";
import { Metadata } from "next";

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug

    const data = await getBlogPostData(slug);

    return <div>
        <h1>{data.frontmatter["title"]}</h1>
        <Post code={data.code}/>
    </div>
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug

    const data = await getBlogPostData(slug);

    return {
        title: data.frontmatter["title"],
        applicationName: "CodelixBlog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: data.frontmatter["description"],
        openGraph: {
            title: data.frontmatter["title"],
            authors: ["Felix"],
            description: data.frontmatter["description"],
            type: "article",
            images: [{
                url: data.frontmatter["banner"]
            }],
            publishedTime: data.frontmatter["publish_date"]
        }
    }
}

export const dynamic = "force-static"
export const revalidate = 60;
