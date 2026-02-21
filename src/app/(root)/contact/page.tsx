import ContactUs from "@/components/Contact";
import { isMobile } from "@/lib/device";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Contact Us"
}

export default async function Contact() {
    const mobileCheck = await isMobile();

    return (
        <main className="flex flex-col w-full justify-center min-h-screen">
            <ContactUs mobileCheck={mobileCheck} />
        </main>
    )
}