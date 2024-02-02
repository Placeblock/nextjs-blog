export default function PostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <script src="https://www.geogebra.org/apps/deployggb.js"></script>
            {children}
        </section>
    )
}