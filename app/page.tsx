import { getBlogPostsMeta, getTags } from "src/posts";
import { Metadata } from "next";
import TagList from "@components/taglist/taglist";
import Postlist from "@components/postlist/postlist";

export const revalidate = 600

export default async function Page() {
    const posts = await getBlogPostsMeta();
    const tags = getTags(posts);
    return <div>
        <div className="post-list-tags" style={{marginBottom: "30px"}}>
            <TagList tags={tags}/>
        </div>
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
        },
        alternates: {
            types: {
                'application/rss+xml': 'https://blog.codelix.de/rss.xml'
            }
        }
    }
}