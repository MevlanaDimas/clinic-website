import DoctorDetailSkeleton from "@/components/Doctor/DoctorDetails/DoctorDetailSkeleton";
import DoctorDetail from "@/components/Doctor/DoctorDetails/index";
import prisma from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export async function generateMetadata({
    params
}: {
    params: Promise<{ doctorName: string }>;
}): Promise<Metadata> {
    const { doctorName } = await params;
    const decodedName = decodeURIComponent(doctorName);

    const doctor = await prisma.staff.findFirst({
        where: {
            name: decodedName,
            title: 'Doctor'
        },
        select: {
            name: true
        }
    });

    return {
        title: "dr. " + doctor?.name
    };
}

export default async function Doctor({
    params
}: {
    params: Promise<{ doctorName: string }>;
}) {
    const { doctorName } = await params;
    const decodedName = decodeURIComponent(doctorName);

    const doctor = await prisma.staff.findFirst({
        where: {
            name: decodedName,
            title: 'Doctor'
        },
        include: {
            DoctorPracticeSchedule: true
        }
    });

    if (!doctor) {
        redirect('/doctor');
    }

    const user = await (await clerkClient()).users.getUser(doctor.id);

    return (
        <main className="flex flex-col w-full min-h-screen bg-white">
            <Suspense fallback={<DoctorDetailSkeleton />}>
                <DoctorDetail {...doctor} imageUrl={user.imageUrl} />
            </Suspense>
        </main>
    )
}