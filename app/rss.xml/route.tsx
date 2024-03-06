import generateRssFeed from "src/rssFeed";

export async function GET() {
    const xmlContent: string = await generateRssFeed();
  
    return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}