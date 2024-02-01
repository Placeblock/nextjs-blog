import "./global.scss";
import Header from "@components/header/header";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <div id="blog">
                    <Header />
                    {children}
                </div>
            </body>
        </html>
    )
}