import Link from "next/link";
import { getBlogPostsMeta } from "lib/posts";

export const revalidate = 60

export default async function Page() {
    const posts = await getBlogPostsMeta();
    return <div>{ 
        posts.map((p, i) => <p key={i}><Link href={p.slug}>{p.data.title}</Link></p>)
    }</div>
}