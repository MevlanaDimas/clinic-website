'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DoctorPracticeSchedule } from "@/generated/prisma/client"
import { MotionDiv } from '@/lib/motion';
import DoctorFilter from "@/components/Filters/Doctor";
import DoctorList from "@/components/Doctor/AllDoctor/DoctorList";

export interface Doctor {
    id: string;
    name: string;
    bio: string | null;
    title: string;
    email: string;
    schedule: DoctorPracticeSchedule[];
    imageUrl?: string;
}
interface DoctorSearchWrapperProps {
    doctorData: Doctor[];
    totalPages: number;
    currentPage: number;
    query: string;
    currentSort: string;
    currentDay: string;
    currentStartTime: string;
    currentEndTime: string;
    currentLimit: string;
}

const DoctorSearchWrapper = ({ doctorData, totalPages, currentPage, query, currentSort, currentDay, currentStartTime, currentEndTime, currentLimit }: DoctorSearchWrapperProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(pathname + '?' + params.toString());
    };

    const handleApplyFilters = (filters: { query: string; sort: string; day: string; startTime: string; endTime: string; limit: string; }) => {
        const params = new URLSearchParams(searchParams.toString());
        if (filters.query) params.set('query', filters.query); else params.delete('query');
        if (filters.sort) params.set('sort', filters.sort); else params.delete('sort');
        if (filters.day && filters.day !== 'all') params.set('day', filters.day); else params.delete('day');
        if (filters.startTime) params.set('startTime', filters.startTime); else params.delete('startTime');
        if (filters.endTime) params.set('endTime', filters.endTime); else params.delete('endTime');
        if (filters.limit) params.set('limit', filters.limit); else params.delete('limit');
        params.set('page', '1');
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilters = () => {
        router.push(pathname);
    };

    return (
        <MotionDiv className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 my-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Doctors</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Meet our team of experienced medical professionals dedicated to your health and well-being.
                </p>
            </div>
            <DoctorFilter 
                onApplyFilters={handleApplyFilters} 
                onClearFilters={handleClearFilters} 
                currentQuery={query} 
                currentSort={currentSort}
                currentDay={currentDay}
                currentStartTime={currentStartTime}
                currentEndTime={currentEndTime}
                currentLimit={currentLimit}
            />
            <DoctorList data={doctorData} totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </MotionDiv>
    );
}

export default DoctorSearchWrapper;