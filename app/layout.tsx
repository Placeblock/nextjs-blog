import "./style.scss";
import Header from "@components/header/header";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div id="blog">
                    <Header />
                    {children}
                </div>
            </body>
        </html>
    )
}