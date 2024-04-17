import Postlist from "@components/postlist/postlist";
import { Metadata } from "next";
import Link from "next/link";
import { getBlogPostsMeta } from "src/posts";

export const revalidate = 600
export const dynamic = "force-static"

export default async function Page({ params }: { params: { tag: string } }) {
    var posts = await getBlogPostsMeta();
    console.log(posts);
    posts = posts.filter(p => p.data.tags.includes(params.tag))
    return <div>
        <Link className="tag" href={"/"}>Alle</Link>
        <Postlist posts={posts}/>
    </div>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Codelix - Blog",
        metadataBase: new URL("https://blog.codelix.de"),
        applicationName: "Codelix - Blog",
        authors: [{name: "Felix", url: "https://codelix.de"}],
        creator: "Felix",
        description: "Hey hey, it is me, Felix! This is my blog where I share interesting things with you. Come take a look!",
        openGraph: {
            title: "Codelix - Blog",
            siteName: "Codelix - Blog",
            description: "Hey hey, it is me, Felix! This is my blog where I share interesting things with you. Come take a look!",
            type: "website",
            images: [{
                url: "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"
            }]
        }
    }
}