import fs from "fs/promises"
import path from "path"
import matter from 'gray-matter'

import rehypePrism from 'rehype-prism'                                                                                                                     
import rehypeKatex from 'rehype-katex'                                                                                                                     
import rehypeSlug from 'rehype-slug'                                         
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import toc from '@jsdevtools/rehype-toc'                       
import remarkMath from 'remark-math'

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMetadata = {
    title: string,
    description: string,
    tags: string[],
    isPublished: boolean,
    publishedOn: Date,
    banner: string
}

export type Post = {
	content: string,
	metadata: PostMetadata
}

export async function getPost(slug: string) : Promise<Post> {
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const source = await fs.readFile(fullPath, 'utf8');
	
    const {content, data} = matter(source);
	
	return {
		content,
		metadata: data as PostMetadata
	}
}

export async function getPostMeta(slug: string): Promise<PostMetadata> {
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const source = await fs.readFile(fullPath, 'utf8');
	
    const {data} = matter(source);
    return data as PostMetadata;
}

export type PostInfo = {
    slug: string,
    data: PostMetadata
}

export async function getBlogPostsMeta(): Promise<PostInfo[]> {
    const fileNames = await fs.readdir(postsDirectory);
    const data = [];
    for (let fileName of fileNames) {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName);
        const source = await fs.readFile(fullPath, "utf-8");
        const matterResult = matter(source);
        data.push({slug, data: matterResult.data as PostMetadata})
    }
    return data.sort((a, b) => {
        if (a.data.publishedOn < b.data.publishedOn) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getTags(metas: PostInfo[]): string[] {
    var tagsmap: {[tag: string]: number} = {}
    for (let meta of metas) {
        if (!meta.data.isPublished) continue;
        for (let tag of meta.data.tags) {
            if (tag in tagsmap) {
                tagsmap[tag]++;
            } else {
                tagsmap[tag] = 1;
            }
        }
    }
    var tagsamount: {tag: string, amount: number}[] = []
    for (const [tag, amount] of Object.entries(tagsmap)) {
        tagsamount.push({tag, amount})
    }
    tagsamount.sort((t1, t2) => t2.amount-t1.amount)
    return tagsamount.map(t => t.tag)
}
