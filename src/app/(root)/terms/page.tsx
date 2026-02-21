import TermsOfService from "@/components/TermsOfService";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Terms of Service"
}

export default function TermsOfServicePage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 font-sans text-slate-800 leading-relaxed">
            <TermsOfService />
        </main>
    )
}