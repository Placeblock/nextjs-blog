import fs from "fs/promises"
import path from "path"
import { bundleMDX } from "mdx-bundler"
import matter from "gray-matter"
import rehypePrism from '@mapbox/rehype-prism'
import remarkMath from "remark-math"
import rehypeKatex from 'rehype-katex'
import imageMetadata from "./imageMetadata"

const postsDirectory = path.join(process.cwd(), "posts");

export async function getBlogPostData(slug: string): Promise<{code: string, data: Metadata}> {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const source = await fs.readFile(fullPath, "utf-8");

    const {code, frontmatter} = await bundleMDX({source: source, mdxOptions: (options, fm) => {
        // Add remark Plugins and rehype Plugins
        options.remarkPlugins = [...(options.remarkPlugins ?? []), ...[remarkMath]]
        options.rehypePlugins = [...(options.rehypePlugins ?? []), ...[imageMetadata, rehypePrism, rehypeKatex]]
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
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}