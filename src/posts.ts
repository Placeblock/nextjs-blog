import fs from "fs/promises"
import path from "path"
import { bundleMDX } from "mdx-bundler"
import matter from "gray-matter"
import rehypePrism from '@mapbox/rehype-prism'
import remarkMath from "remark-math"
import rehypeKatex from 'rehype-katex'
import imageMetadata from "./imageMetadata"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import toc from "@jsdevtools/rehype-toc"

const postsDirectory = path.join(process.cwd(), "posts");

export async function getBlogPostData(slug: string): Promise<{code: string, data: Metadata} | null> {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    let source: string;
    try {
        source = await fs.readFile(fullPath, "utf-8");
    } catch(err) {
        return null;
    }

    const {code, frontmatter} = await bundleMDX({source: source, mdxOptions: (options, fm) => {
        // Add remark Plugins and rehype Plugins
        options.remarkPlugins = [...(options.remarkPlugins ?? []), ...[remarkMath]]
        options.rehypePlugins = [...(options.rehypePlugins ?? []), ...[rehypeKatex, rehypeSlug, rehypeAutolinkHeadings, imageMetadata, rehypePrism, [toc, {
            customizeTOC: toc => {
                toc.children.unshift({
                    type: "element",
                    tagName: "h2",
                    children: [{type: 'text', value: 'Table of Contents'}]
                })
                toc.children.push({
                    type: "element",
                    tagName: "hr",
                    properties: {
                        style: "margin-block:40px;"
                    }
                })
            }
        }]]]
        return options;
    }})

    return {code, data: (frontmatter as Metadata)};
}

export type Post = {
    slug: string,
    data: Metadata
}

export type Metadata = {
    title: string,
    description: string,
    tags: string[],
    isPublished: boolean,
    publishedOn: Date,
    banner: string
}

export async function getBlogPostsMeta(): Promise<Post[]> {
    const fileNames = await fs.readdir(postsDirectory);
    const data = [];
    for (let fileName of fileNames) {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName);
        const source = await fs.readFile(fullPath, "utf-8");
        const matterResult = matter(source);
        data.push({slug, data: matterResult.data})
    }
    return data.sort((a, b) => {
        if (a.data.publishedOn < b.data.publishedOn) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getTags(metas: Post[]): string[] {
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