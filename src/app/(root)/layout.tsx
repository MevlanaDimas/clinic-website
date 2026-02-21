import Footer from "@/components/Utilities/Footer";
import Navigation from "@/components/Utilities/Navigation";
import { isMobile } from "@/lib/device";


export default async function AppNavLayout({
    children
}: {
    children: React.ReactNode
}) {
    const mobileCheck = await isMobile();

    return (
        <>
            <header>
                <Navigation mobileCheck={mobileCheck} />
            </header>
            {children}
            <Footer />
        </>
    )
}