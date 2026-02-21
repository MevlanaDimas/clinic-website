'use client'

import Image from "next/image"
import image from "../../../../public/1.svg"
import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { MotionDiv, MotionSpan } from "@/lib/motion"

const CONTACT_INFO = {
    address: "Jl. Jend. Sudirman No.325, Purwokerto, Jawa Tengah 53115",
    mapLink: "https://maps.app.goo.gl/JZDenmGmrEJZesSB8",
    phone: "+62 123 4567 890",
    email: "contact@clinic.com"
};

const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/profile.php?",
    instagram: "https://www.instagram.com/"
};

const Footer = () => {
    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

    const onWhatsappClick = () => {
        const encodedMessage = encodeURIComponent("Hello, I want to ask about ...");

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    return (
        <footer className="bg-slate-900 text-white pt-12 pb-5 border-t border-slate-800 w-screen relative left-1/2 -translate-x-1/2">
            <MotionDiv className="container mx-auto px-10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand & Contact */}
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                        <Link href="/" className="inline-block">
                            <Image src={image} width={200} height={83} alt="Clinic Logo" className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <div className="space-y-4 text-slate-400 text-sm w-full justify-center md:justify-start flex flex-col">
                            <Link href={CONTACT_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors group">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                                <p className="leading-relaxed text-center md:text-left">{CONTACT_INFO.address}</p>
                            </Link>
                            <button onClick={onWhatsappClick} className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors group cursor-pointer">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                                <p>{CONTACT_INFO.phone}</p>
                            </button>
                            <Link href={`mailto:${CONTACT_INFO.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors group">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                                <p>{CONTACT_INFO.email}</p>
                            </Link>
                        </div>
                        <div className="flex gap-3 w-full justify-center md:justify-start">
                            <Link href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2.5 rounded-full text-slate-300 transition-all duration-300">
                                <MotionSpan whileHover={{ scale: 1.08 }} className="inline-flex items-center justify-center p-1">
                                    <Facebook size={18} />
                                </MotionSpan>
                            </Link>
                            <Link href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2.5 rounded-full text-slate-300 transition-all duration-300">
                                <MotionSpan whileHover={{ scale: 1.08 }} className="inline-flex items-center justify-center p-1">
                                    <Instagram size={18} />
                                </MotionSpan>
                            </Link>
                        </div>
                    </div>

                    {/* Patient Care */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold mb-6 text-white">Patient Care</h3>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Find a Doctor</Link></li>
                            <li><button onClick={onWhatsappClick} className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200 cursor-pointer">Book Appointment</button></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">About Us</Link></li>
                            <li><Link href="/news" className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">News</Link></li>
                            <li><Link href="/promo" className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Promo</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="space-y-4 w-full flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold mb-6 text-white">Visit Us</h3>
                        <div className="rounded-xl overflow-hidden h-100 md:h-64 w-full bg-slate-800 relative shadow-lg border border-slate-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16896.986783126278!2d109.21985065246558!3d-7.424504281375932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e6385852c5b%3A0xe926d2be744602b3!2sJl.%20Jend.%20Sudirman%20No.325%2C%20Purwokerto%2C%20Sokanegara%2C%20Kec.%20Purwokerto%20Tim.%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah%2053115!5e1!3m2!1sid!2sid!4v1767970000163!5m2!1sid!2sid"
                                title="Our Clinic Location"
                                width="100%"
                                height="100%"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 border-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Dimas Portfolio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/cookie" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </MotionDiv>
        </footer>
    )
}

export default Footer