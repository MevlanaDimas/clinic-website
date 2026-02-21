'use client'

import Image from "next/image";
import image from "../../../../public/TaeAugust07.jpg";
import Link from "next/link";
import { MotionSection } from '@/lib/motion';


const About = () => {
    return (
        <MotionSection className="w-full py-20 bg-white" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="container mx-auto px-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="w-full lg:w-1/2 relative h-100 lg:h-150 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={image}
                            alt="About Clinic"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">About Our Clinic</h1>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Established in 2023, Clinic is a dedicated Klinik Pratama committed to providing accessible, high-quality medical care to our community. Our journey began with a simple mission: to treat every patient like family. By combining professional medical expertise with a warm, compassionate touch, we have grown into a trusted partner for local wellness.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            From general consultations to preventive care, we focus on delivering accurate diagnoses and effective treatments. At our clinic, your health is our priority, and we strive to build a healthier future together through integrity and excellence in every service we provide.
                        </p>
                        <Link href="/about" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive self-start px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </MotionSection>
    )
};

export default About;