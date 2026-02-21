'use client'

import Image from "next/image";
import visioAndMissionBanner from '../../../../public/Blue And Green Modern Pharmacy Banner.png';
import { MotionDiv } from "@/lib/motion";


const VisionAndMission = () => {
    return (
        <MotionDiv className="flex flex-col w-full px-4 md:px-10 pt-24" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/* Background Image and Overlay */}
            <div className="w-full">
                <Image
                    src={visioAndMissionBanner}
                    alt="Vision and Mission Banner"
                    className="w-full h-auto"
                    priority
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-10 py-16 md:py-24">
                {/* Grid for the three columns: About, Vision, Mission */}
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-25">

                    {/* About Us Column */}
                    <div className="flex flex-col h-full space-y-4">
                        <h1 className="text-3xl font-bold border-b-2 border-blue-600 pb-2 w-fit text-gray-900">About Us</h1>
                        <div className="flex-1 flex items-center">
                            <p className="text-gray-600 leading-relaxed text-left">
                                Clinic is a premier primary care clinic (Klinik Pratama) dedicated to delivering high-quality medical services with efficiency and integrity. Driven by a team of skilled medical professionals and equipped with modern facilities, we focus on preventive care, accurate diagnosis, and effective treatment. We uphold the highest standards of medical ethics to ensure that every patient receives prompt, precise, and professional care tailored to their unique needs.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-rows-2">
                        {/* Vision Column */}
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold border-b-2 border-blue-600 pb-2 inline-block text-gray-900">Vision</h1>
                            <p className="text-gray-600 leading-relaxed text-left">
                                Your first choice for a healthier life and a better future.
                            </p>
                        </div>

                        {/* Mission Column */}
                        <div className="space-y-4 -mt-4 md:-mt-8">
                            <h1 className="text-3xl font-bold border-b-2 border-blue-600 pb-2 inline-block text-gray-900">Mission</h1>
                            {/* Using a UL for the list of missions for semantic correctness */}
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start text-left">
                                    <span className="text-blue-600 mr-3 mt-1 shrink-0">&#10003;</span>
                                    <span>To deliver excellence in patient-centered care.</span>
                                </li>
                                <li className="flex items-start text-left">
                                    <span className="text-blue-600 mr-3 mt-1 shrink-0">&#10003;</span>
                                    <span>To foster a healthy community through education and prevention.</span>
                                </li>
                                <li className="flex items-start text-left">
                                    <span className="text-blue-600 mr-3 mt-1 shrink-0">&#10003;</span>
                                    <span>To provide affordable healthcare without compromising on quality.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MotionDiv>
    )
};

export default VisionAndMission;