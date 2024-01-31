import fs from "fs/promises"
import path from "path"
import { bundleMDX } from "mdx-bundler"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts");

export async function getBlogPostData(slug: string): Promise<{code: string, frontmatter: {}}> {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const source = await fs.readFile(fullPath, "utf-8");

    const {code, frontmatter} = await bundleMDX({source: source, mdxOptions: (options, fm) => {
        // Add remark Plugins and rehype Plugins
        return options;
    }})

    return {code, frontmatter};
}

export async function getBlogPostsMeta(): Promise<{slug: string, data: {[key: string]: any}}[]> {
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