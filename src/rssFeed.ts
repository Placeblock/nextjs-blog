import RSS from 'rss';
import { getBlogPostsMeta } from './posts';

export default async function generateRssFeed() {
    const site_url = 'https://blog.codelix.de';

    const feedOptions = {
        title: "Codelix - Blog - RSS Feed",
        description: "Hey hey, it is me, Felix! This is my blog where I share interesting things with you. Come take a look!",
        site_url: site_url,
        feed_url: `${site_url}/rss.xml`,
        image_url: `${site_url}/favicon.ico`,
        pubDate: new Date()
    };

    const feed = new RSS(feedOptions);

    const posts = await getBlogPostsMeta();

    for (let post of posts) {
        feed.item({
            title: post.data.title,
            description: post.data.description,
            url: `${site_url}/${post.slug}`,
            date: post.data.publishedOn,
            categories: post.data.tags
        })
    }

    return feed.xml();
}