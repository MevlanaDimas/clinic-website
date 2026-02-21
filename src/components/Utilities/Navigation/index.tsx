'use client'

import Image from "next/image"
import image from '../../../../public/1.svg'
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import { ChevronDown, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { MotionDiv, MotionSpan } from "@/lib/motion"

const OPAQUE_NAV_PAGES = ['about', 'news', 'promo', 'doctor', 'privacy', 'terms', 'cookie'];
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
const ENCODED_MESSAGE = encodeURIComponent("Hello I want to book on appointment");

const NAV_ITEMS = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Media',
        href: '/news',
        children: [
            {
                name: 'News',
                href: '/news'
            },
            {
                name: 'Promo',
                href: '/promo'
            }
        ]
    },
    {
        name: 'Patient Care',
        href: '#',
        children: [
            {
                name: 'Doctors',
                href: '/doctor'
            },
            {
                name: 'Book Appointment',
                href: `https://wa.me/${WHATSAPP_NUMBER}?text=${ENCODED_MESSAGE}`,
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        ]
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
];

const Navigation = ({ mobileCheck}: { mobileCheck: boolean }) => {
    const pathname = usePathname().split('/').filter(Boolean);
    const isCannotTransparentPage = OPAQUE_NAV_PAGES.includes(pathname[0] || '');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setIsScrolled(scrolled);
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isScrolled]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isScrolled || isCannotTransparentPage || mobileCheck ? `bg-white/80 backdrop-blur-md border-gray-100 ${mobileCheck ? "" : "rounded-b-2xl shadow-md"}` : "bg-transparent border-transparent"} py-2 px-10`}>
            <MotionDiv className="container mx-auto h-20 flex items-center justify-between"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative size-24 md:size-45 transition-transform duration-300 group-hover:scale-110">
                        <Image src={image} alt="Clinic Logo" fill className="object-contain" />
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    {NAV_ITEMS.map((item) => (
                        item.children ? (
                            <div key={item.name} className="relative group">
                                <Button className="flex items-center gap-1 py-2 outline-none bg-transparent hover:bg-transparent cursor-pointer">
                                    <span className={`relative text-sm font-semibold ${isScrolled || isCannotTransparentPage ? "text-black" : "text-white"} group-hover:text-blue-600 group-hover:font-bold transition-colors`}>
                                        {item.name}
                                        <span className="absolute left-0 -bottom-2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </Button>
                                
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-9 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-48">
                                    <div className="w-75 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-4 flex flex-col gap-3">
                                        {item.children.map((child) => {
                                            const isBooking = child.name === 'Book Appointment';
                                            return (
                                                <Link 
                                                    key={child.name} 
                                                    href={child.href}
                                                    target={child.target}
                                                    rel={child.rel}
                                                    className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 font-bold ${
                                                        isBooking 
                                                            ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg" 
                                                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                                    }`}
                                                >
                                                    {isBooking && <FaWhatsapp size={18} />}
                                                    {child.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            ) : (
                            <Link key={item.name} href={item.href} className="relative group">
                                <MotionSpan whileHover={{ y: -2 }} className={`text-sm font-semibold ${isScrolled || isCannotTransparentPage ? "text-black" : "text-white"} group-hover:text-blue-600 group-hover:font-bold transition-colors py-2 inline-block`}>
                                    {item.name}
                                </MotionSpan>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        )
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar className="hidden lg:flex" />
                    <Button 
                        className="lg:hidden p-2 rounded-lg bg-transparent hover:bg-transparent text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </MotionDiv>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-6 flex flex-col gap-6 max-h-[calc(100vh-80px)] overflow-y-auto h-screen">
                    <SearchBar className="block w-full" />
                    <div className="flex flex-col gap-4">
                        {NAV_ITEMS.map((item) => (
                            item.children ? (
                                <div key={item.name} className="flex flex-col">
                                    <Button 
                                        onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === item.name ? null : item.name)}
                                        className="flex items-center justify-between py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-transparent cursor-pointer pl-0!"
                                    >
                                        {item.name}
                                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeMobileSubmenu === item.name ? "rotate-180" : ""}`} />
                                    </Button>
                                    {activeMobileSubmenu === item.name && (
                                        <div className="flex flex-col gap-2 pl-4 mt-2 border-l-2 border-gray-100">
                                            {item.children.map((child) => {
                                                const isBooking = child.name === 'Book Appointment';
                                                return (
                                                    <Link 
                                                        key={child.name} 
                                                        href={child.href}
                                                        className={`flex items-center gap-2 py-2 text-sm ${isBooking ? "text-green-600 font-bold" : "text-gray-600"}`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {isBooking && <FaWhatsapp size={16} />}
                                                        {child.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    className="py-2 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
};

export default Navigation;