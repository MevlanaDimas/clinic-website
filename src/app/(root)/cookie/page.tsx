import CookiePolicy from "@/components/CookiePolicy";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Cookie Policy"
}

export default function CookiePolicyPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 font-sans text-slate-800 leading-relaxed">
            <CookiePolicy />
        </main>
    )
}