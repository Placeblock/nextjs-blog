export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div id="blog">
                    {children}
                </div>
            </body>
        </html>
    )
}