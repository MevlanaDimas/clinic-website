'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SlugLink = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [slug, setSlug] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlug = async () => {
            try {
                const res = await fetch(`/api/link/news?title=${encodeURIComponent(title)}`);
                if (res.ok) {
                    const data = await res.json();
                    setSlug(data.slug);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (title) {
            fetchSlug();
        }
    }, [title]);

    return (
        <Link 
            href={slug ? `/news/${slug}` : "#"} 
            className={`${loading ? 'animate-pulse opacity-50' : ''} text-indigo-600 font-medium hover:underline`}
        >
            {children}
        </Link>
    );
};

export default SlugLink;