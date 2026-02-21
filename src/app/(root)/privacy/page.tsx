import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Privacy Policy"
}

export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-6 sm:px-8 font-sans text-slate-900">
            <PrivacyPolicy />
        </main>
    )
}