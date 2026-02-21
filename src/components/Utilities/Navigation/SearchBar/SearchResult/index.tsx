"use client"

import { useState, useEffect } from "react"
import { MotionDiv } from '@/lib/motion';
import Link from "next/link"
import { Calendar, User, Newspaper } from "lucide-react"

interface SearchResultData {
    news: { id: string; title: string; slug: string; publishedAt: string | null }[];
    promos: { id: number; headline: string; code: string; validUntil: string | null }[];
    doctors: {
        id: string;
        name: string;
        DoctorPracticeSchedule: {
            id: number;
            day: string;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    }[];
}

export default function SearchResults({ term }: { term: string }) {
    const [data, setData] = useState<SearchResultData | null>(null)

    useEffect(() => {
        let active = true;
        const fetchData = async () => {
            const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
            const json = await res.json()
            if (active) setData(json)
        }
        fetchData()
        return () => { active = false }
    }, [term])

    if (!data) return null

    const noResults = !data.news?.length && !data.promos?.length && !data.doctors?.length

    return (
        <MotionDiv className="space-y-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/* News */}
            <Section title="News" items={data.news} icon={<Newspaper size={14}/>} render={(item) => (
                <Link key={item.id} href={`/news/${item.slug}`} className="block p-2 hover:bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-[10px] text-gray-400">Published: {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'N/A'}</p>
                </Link>
            )} />

            {/* Promos */}
            <Section title="Promos" items={data.promos} icon={<Calendar size={14}/>} render={(item) => (
                <Link key={item.id} href={`/promo/${encodeURIComponent(item.headline)}`} className="block p-2 hover:bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{item.headline} ({item.code})</p>
                    <p className="text-[10px] text-red-500 font-medium">Until: {item.validUntil ? new Date(item.validUntil).toLocaleDateString() : 'N/A'}</p>
                </Link>
            )} />

            {/* Doctors with Availability Logic */}
            <Section title="Doctors" items={data.doctors} icon={<User size={14}/>} render={(item) => (
                <Link key={item.id} href={`/doctor/${encodeURIComponent(item.name)}`} className="block p-2 hover:bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {item.DoctorPracticeSchedule?.map((s) => (
                            <span 
                                key={s.id} 
                                className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                                    s.isAvailable 
                                    ? "bg-green-50 text-green-700 border-green-200" 
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                            >
                                {s.day}: {s.startTime}-{s.endTime}
                            </span>
                        ))}
                    </div>
                </Link>
            )} />

            {noResults && (
                <div className="py-6 text-center text-gray-500 text-sm italic">
                    No results found for &quot;{term}&quot;
                </div>
            )}
        </MotionDiv>
    )
}

interface SectionProps<T> {
    title: string;
    items: T[] | undefined;
    render: (item: T) => React.ReactNode;
    icon: React.ReactNode;
}

const Section = <T,>({ title, items, render, icon }: SectionProps<T>) => {
    if (!items || items.length === 0) return null
    return (
        <div>
            <div className="flex items-center gap-2 mb-2 px-2 bg-gray-100 rounded-md py-1.5">
                {icon}
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">{title}</h3>
            </div>
            {items.map(render)}
        </div>
    )
}