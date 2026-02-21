
"use client"

import dynamic from "next/dynamic"
import { useState } from "react";
import { Cookie } from "lucide-react";
import { MotionDiv, MotionButton } from "@/lib/motion";


const WhatsApp = dynamic(() => import("./WhatsApp"), {
    ssr: false
});
const BackToTop = dynamic(() => import("./BackToTop"), {
    ssr: false
});
const CookieConsent = dynamic(() => import("./CookieConsent"), {
    ssr: false
});

export default function ClientWidgetWrapper() {
    const [isCookieOpen, setIsCookieOpen] = useState(false);

    return (
        <>
            <MotionDiv
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-6 left-6 z-90"
            >
                <MotionButton
                    className="flex justify-center items-center w-15 h-15 rounded-full shadow-lg border border-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-900 cursor-pointer"
                    onClick={() => setIsCookieOpen(true)}
                    aria-label="Cookie Settings"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <Cookie size={45} className="text-slate-700 dark:text-slate-300" />
                </MotionButton>
            </MotionDiv>
            <CookieConsent isOpen={isCookieOpen} setIsOpen={setIsCookieOpen} />
            <BackToTop />
            <WhatsApp />
        </>
    );
}