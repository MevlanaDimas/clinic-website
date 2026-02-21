'use client'

import { AlarmClockCheck, HeartHandshake, ShieldCheck, Umbrella } from "lucide-react";
import Image from "next/image";
import image from "../../../../public/4930343.jpg";
import { Variants } from 'framer-motion';
import { MotionDiv, MotionSection } from '@/lib/motion';

const WHY_CHOOSE = [
    {
        icon: <AlarmClockCheck size={40} className="text-blue-600" />,
        title: "Experience",
        desc: "Years of dedicated service providing top-notch healthcare to our community."
    },
    {
        icon: <Umbrella size={40} className="text-blue-600" />,
        title: "Collaborate with BPJS",
        desc: "Fully integrated with national health insurance for your convenience."
    },
    {
        icon: <HeartHandshake size={40} className="text-blue-600" />,
        title: "Friendly Service",
        desc: "Our staff is trained to provide warm, welcoming, and empathetic care."
    },
    {
        icon: <ShieldCheck size={40} className="text-blue-600" />,
        title: "Certified Doctors",
        desc: "Treatment by highly qualified and board-certified medical professionals."
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
}

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
}

const Hero = () => {
    return (
        <MotionSection className="w-full py-20 bg-gray-50 px-10" initial="hidden" animate="show" variants={container}>
            <div className="container mx-auto px-4 flex flex-col items-center gap-12">
                <MotionDiv variants={itemVariant} className="w-full max-w-4xl relative h-75 md:h-125 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src={image}
                        alt="Clinic Hero"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center pb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
                            Why Choose Our Clinic?
                        </h1>
                    </div>
                </MotionDiv>
                <MotionDiv className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-5" variants={container}>
                    {WHY_CHOOSE.map((item, index) => (
                        <MotionDiv key={index} variants={itemVariant} className="flex flex-row gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
                                {item.icon}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </MotionDiv>
                    ))}
                </MotionDiv>
            </div>
        </MotionSection>
    )
};

export default Hero;