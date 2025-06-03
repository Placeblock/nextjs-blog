import "./code.scss";
import "./style.scss";
import "./math.css";
import {Card, InfoCard, ErrorCard} from "@components/card/card"
import Details from "@components/details"
import GeoGebra from "@components/geogebra/geogebra"
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { compileMDX } from 'next-mdx-remote/rsc'

import rehypePrism from 'rehype-prism'                                       
import rehypeKatex from 'rehype-katex'                                                                                                                     
import rehypeSlug from 'rehype-slug'                                                             
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import toc from '@jsdevtools/rehype-toc'                                                                                                                   
import remarkMath from 'remark-math'

export default async function Post({source}: { source: string }) {

	const {content} = await compileMDX({
		source: source,
		options: {
			mdxOptions: {
				remarkPlugins: [remarkMath],
	            rehypePlugins: [rehypeKatex, rehypeSlug, rehypeAutolinkHeadings, rehypePrism, [toc, {
                    customizeTOC: toc => {
                        if (toc.children[0].children.length === 0) return false;
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
                }]]
			}
		},
		components: {
		        Card, InfoCard, ErrorCard,
		        GeoGebra, Details,
		        img: (props) => (
		            <Image
		                style={{maxWidth: "100%", height: "auto"}}
		                {...(props as ImageProps)}
		            />
		        ),
		        a: (props) => {
		            const absolute = props.href.startsWith("http://") || props.href.startsWith("https://");
		            if (absolute) {
		                return <a {...props} target={absolute ? "_blank" : ""}></a>
		            } else {
		                return <Link href={props.href}>{props.children}</Link>
		            }
		        }
	    }
	})
    return <div id="post" style={{position: "relative"}}>{content}</div>;

}
