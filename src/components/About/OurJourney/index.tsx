'use client'

import Image from "next/image";
import clinicImage from '../../../../public/3d-rendering-hospital-building.jpg';
import { MotionDiv } from "@/lib/motion";

const OurJourney = () => {
    return (
        <div className="w-full py-20 bg-white">
            <div className="container mx-auto px-10 lg:px-15">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <MotionDiv className="flex flex-col gap-15" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Journey</h2>
                            <div className="w-24 h-1.5 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="text-lg text-gray-600 leading-relaxed space-y-10 text-justify">
                            <p>
                                Founded in 2023, Clinic began with a singular, profound vision: to bring high-quality, compassionate healthcare to the heart of Purwokerto. What started as a modest medical practice established by Dr. X was built on the belief that everyone deserves clinical excellence delivered with a personal, family-like touch.
                            </p>
                            <p>
                                In our early years, we focused on building trust within the neighborhood, serving as a reliable first point of contact for families. As the community grew, so did we. We transitioned into a fully-fledged Klinik Pratama, continuously modernizing our facilities and expanding our medical team to meet increasing health demands.
                            </p>
                            <p>
                                Despite our growth, our motivation remains unchanged. We have stood by our patients through every challenge, evolving from a small local practice into a cornerstone of regional wellness. Today, Clinic is proud to be a trusted sanctuary for healing, combining years of experience with a modern approach to primary care. We continue to honor our legacy by treating every patient not just as a medical case, but as a member of our extended family.
                            </p>

                        </div>
                    </MotionDiv>
                    <MotionDiv className="relative w-full rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Image
                            src={clinicImage}
                            alt="Clinic Image"
                            className="w-full h-auto"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </MotionDiv>
                </div>
            </div>
        </div>
    )
}

export default OurJourney;