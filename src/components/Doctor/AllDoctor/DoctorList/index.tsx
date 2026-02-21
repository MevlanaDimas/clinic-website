"use client";

import Image from "next/image";
import Link from "next/link";
import CustomPagination from "@/components/CustomPagination";
import { CalendarClock } from "lucide-react";
import { MotionDiv } from "@/lib/motion"
import { Doctor } from "..";

const cardVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45 } }
}

interface DoctorListProps {
    data: Doctor[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const DoctorList = ({ data, totalPages, currentPage, onPageChange }: DoctorListProps) => {
    if (data.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((doctor) => (
                    <MotionDiv key={doctor.id} variants={cardVariant} initial="initial" animate="animate">
                        <Link 
                            href={`/doctor/${encodeURIComponent(doctor.name)}`} 
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
                        >
                            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                                <Image
                                    src={doctor.imageUrl || '/placeholder-doctor.jpg'}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium">View Profile</span>
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col grow">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                    {doctor.name}
                                </h3>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                                    {doctor.title}
                                </p>
                                
                                <div className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 grow">
                                    {doctor.bio || "No biography available."}
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <CalendarClock className="w-4 h-4 mr-2 text-indigo-500" />
                                        <span>
                                            {doctor.schedule && doctor.schedule.length > 0 
                                                ? `${doctor.schedule.length} Active Schedules` 
                                                : 'No Schedule Available'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </MotionDiv>
                ))}
            </div>

            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default DoctorList;
