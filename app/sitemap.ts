import { MetadataRoute } from 'next'
import { getBlogPostsMeta, getTags } from 'src/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPostsMeta();
    const tags = getTags(posts);
    return [
        {
            url: "https://blog.codelix.de",
            lastModified: new Date(),
            changeFrequency: "monthly"
        },
        ...posts.filter(p => p.data.isPublished).map(p => ({
            url: "https://blog.codelix.de/"+p.slug,
            lastModified: p.data.publishedOn,
            changeFrequency: ("monthly" as "monthly")
        })),
        ...tags.map(tag => ({
            url: "https://blog.codelix.de/tags/"+tag,
            lastModified: new Date(),
            changeFrequency: ("monthly" as "monthly")
        }))
    ]
  }