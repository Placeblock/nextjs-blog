export default function PostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section id="post">
            {children}
        </section>
    )
}