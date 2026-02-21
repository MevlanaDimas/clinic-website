import DoctorSearchWrapper from "@/components/Doctor/AllDoctor";
import { Prisma } from "@/generated/prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";
import { DoctorListSkeleton } from "@/components/Doctor/AllDoctor/DoctorList/DoctorListSkeleton";



export const metadata: Metadata = {
    title: "Doctors"
}

export default async function Doctors({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; limit?: string; sort?: string; day?: string; startTime?: string; endTime?: string }>;
}) {
    const { query, page, limit, sort, day, startTime, endTime } = await searchParams;

    const isViewAll = limit === 'all';

    const itemsPerPage = isViewAll ? undefined : (Number(limit) || 10);
    const currentPage = Number(page) || 1;
    const skip = isViewAll ? undefined : (currentPage - 1) * (itemsPerPage || 10);

    const where: Prisma.StaffWhereInput = {
        title: 'Doctor'
    };

    if (query) {
        where.name = {
            contains: query,
            mode: 'insensitive'
        };
    }

    if (day || startTime || endTime) {
        const scheduleWhere: Prisma.DoctorPracticeScheduleWhereInput = {};
        
        if (day && day !== 'all') {
            scheduleWhere.day = { equals: day, mode: 'insensitive' };
        }
        if (startTime) {
            scheduleWhere.startTime = { gte: startTime };
        }
        if (endTime) {
            scheduleWhere.endTime = { lte: endTime };
        }

        where.DoctorPracticeSchedule = {
            some: scheduleWhere
        };
    }

    let orderBy: Prisma.StaffOrderByWithRelationInput = { name: 'asc' };
    if (sort === 'name_desc') {
        orderBy = { name: 'desc' };
    }

    const [rawDoctors, totalCount] = await Promise.all([
        prisma.staff.findMany({
            where,
            include: {
                DoctorPracticeSchedule: true
            },
            orderBy,
            take: itemsPerPage,
            skip: skip
        }),
        prisma.staff.count({ where })
    ]);

    const totalPages = isViewAll ? 1 : Math.ceil(totalCount / (itemsPerPage || 10));

    const userIds = rawDoctors.map(d => d.id);
    const usersMap = new Map<string, string>();

    if (userIds.length > 0) {
        const clerk = await clerkClient();
        const { data: users } = await clerk.users.getUserList({
            userId: userIds,
            limit: 100
        });
        users.forEach((user: { id: string; imageUrl: string }) => {
            usersMap.set(user.id, user.imageUrl);
        });
    }

    const doctorData = rawDoctors.map(doc => ({
        ...doc,
        schedule: doc.DoctorPracticeSchedule,
        imageUrl: usersMap.get(doc.id)
    }));

    return (
        <main className="flex flex-col w-full justify-center min-h-screen bg-gray-50/50 dark:bg-gray-900">
            <Suspense fallback={<DoctorListSkeleton />}>
                <DoctorSearchWrapper 
                    doctorData={doctorData} 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    query={query || ''}
                    currentSort={sort || 'name_asc'}
                    currentDay={day || 'all'}
                    currentStartTime={startTime || ''}
                    currentEndTime={endTime || ''}
                    currentLimit={limit || '10'}
                />
            </Suspense>
        </main>
    )
}