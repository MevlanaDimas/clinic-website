'use client'

import { ChartLine, CirclePlus, Crown, HandHeart, MessageCircleMore, Scale } from "lucide-react";
import { MotionDiv } from "@/lib/motion";

const VALUES = [
    {
        Icon: HandHeart,
        letter: "C",
        title: "Compassion",
        description: "We treat every patient with kindness, empathy, and a deep understanding of their needs."
    },
    {
        Icon: CirclePlus,
        letter: "A",
        title: "Accuracy",
        description: "We are committed to clinical excellence, ensuring precise diagnoses and effective treatment plans."
    },
    {
        Icon: MessageCircleMore,
        letter: "R",
        title: "Responsiveness",
        description: "Your time and health are vital. We provide prompt medical attention and clear communication."
    },
    {
        Icon: Scale,
        letter: "I",
        title: "Integrity",
        description: "We uphold the highest ethical standards, ensuring transparency and honesty in every medical consultation."
    },
    {
        Icon: Crown,
        letter: "N",
        title: "Noble Service",
        description: "We view healthcare as a calling. We serve our community with dedication and a genuine desire to help others."
    },
    {
        Icon: ChartLine,
        letter: "G",
        title: "Growth",
        description: "We continuously improve our skills and facilities to stay at the forefront of primary medical care."
    }
];

const OurCulture = () => {
    return (
        <div className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Core Values: <span className="text-blue-600">C.A.R.I.N.G.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        To ensure the highest level of service, every member of our team lives by these principles:
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-15">
                    {VALUES.map((item, index) => (
                        <MotionDiv
                            key={index}
                            className="group flex items-center gap-6 p-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.06 } }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                <item.Icon size={32} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    <span className="text-blue-600 text-2xl mr-1">{item.letter}</span>
                                    - {item.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default OurCulture;