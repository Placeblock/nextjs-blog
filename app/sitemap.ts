import { MetadataRoute } from 'next'
import { getBlogPostsMeta } from 'src/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPostsMeta();
    return [
        {
            url: "https://blog.codelix.de",
            lastModified: new Date(),
            changeFrequency: "monthly"
        },
        ...posts.map(p => ({
            url: "https://blog.codelix.de/"+p.slug,
            lastModified: (p.data.publishedOn),
            changeFrequency: ("monthly" as "monthly")
        }))
    ]
  }