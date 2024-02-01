import { Node } from "unist";
import path from "path"
import {visit} from 'unist-util-visit'
import { Processor } from "unified";
import { VFile } from "vfile";
import sizeOf from 'image-size'

interface ImageNode extends Node {
    type: "element";
    tagName: "img";
    properties: {
      src: string;
      height?: number;
      width?: number;
    };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
    const img = node as ImageNode;
    return (
      img.type === "element" &&
      img.tagName === "img" &&
      img.properties &&
      typeof img.properties.src === "string"
    );
}

function filterImageNode(node: ImageNode): boolean {
    return node.properties.src.startsWith("/");
}

function addMetadata(node: ImageNode) {
    const res = sizeOf(
      path.join(process.cwd(), "public", node.properties.src)
    );
  
    if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);
  
    node.properties.width = res.width;
    node.properties.height = res.height;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export default function imageMetadata(this: Processor) {
    return async function transformer(tree: Node, file: VFile): Promise<Node> {
      const imgNodes: ImageNode[] = [];
  
      visit(tree, "element", (node) => {
        if (isImageNode(node) && filterImageNode(node)) {
          imgNodes.push(node);
        }
      });
  
      for (const node of imgNodes) {
        addMetadata(node);
      }
  
      return tree;
    };
}