import generateRssFeed from "src/rssFeed";

export async function GET() {
    console.log("GENERATE RSS")
    const xmlContent: string = await generateRssFeed();
  
    return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}

export const revalidate = 300
export const dynamic = "force-static"