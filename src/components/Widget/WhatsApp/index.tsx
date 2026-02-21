'use client'

import Link from "next/link";
import { MotionDiv } from "@/lib/motion";
import { FaWhatsapp } from "react-icons/fa";


const WhatsApp = () => {
    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
    const encodedMessage = encodeURIComponent("Hello, I want to ask about ...");
    const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    return (
        <MotionDiv
            drag
            dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] cursor-grab active:cursor-grabbing touch-none rounded-full p-4 shadow-lg"
        >
            <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-white rounded-full shadow-2xl flex items-center justify-center transition-transform">
                <FaWhatsapp size={44} />
            </Link>
        </MotionDiv>
    );
}

export default WhatsApp;