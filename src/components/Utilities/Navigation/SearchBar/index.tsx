'use client'

import { useState, useEffect, useRef, Suspense, lazy } from "react"
import { MotionDiv } from '@/lib/motion';
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

// Lazy load the results to trigger Suspense
const SearchResults = lazy(() => import("./SearchResult"))

const SearchBar = ({ className }: { className?: string }) => {
    const [term, setTerm] = useState("")
    const [debouncedTerm, setDebouncedTerm] = useState("")
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const onReset = () => {
        setTerm("")
        setOpen(false)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (term.length > 2) setOpen(true)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(term)
        }, 300)
        return () => clearTimeout(handler)
    }, [term])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <MotionDiv ref={containerRef} className={`relative ${className || "w-full lg:w-64"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <form onSubmit={onSubmit} className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <Input 
                    value={term}
                    onChange={(e) => {
                        setTerm(e.target.value)
                        if (e.target.value.length > 2) setOpen(true)
                    }}
                    placeholder="Search..." 
                    className="pl-10 pr-10 rounded-full bg-gray-100 border-none focus-visible:ring-2 focus-visible:ring-blue-500 w-full" 
                />
                {term && (
                    <button type="button" onClick={onReset} aria-label="Clear Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                        <X size={16} />
                    </button>
                )}
            </form>

            {open && term.length > 2 && (
                <MotionDiv className="absolute top-full mt-3 w-full lg:w-100 bg-white rounded-2xl shadow-2xl border border-gray-100 lg:right-0 z-50 p-4 max-h-125 overflow-y-auto" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <Suspense fallback={<SearchSkeleton />}>
                        <SearchResults term={debouncedTerm} />
                    </Suspense>
                </MotionDiv>
            )}
        </MotionDiv>
    )
}

// Shadcn Skeleton loading state
function SearchSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                    <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" /> {/* Section Title */}
                    <div className="space-y-2">
                        <div className="h-10 w-full bg-gray-50 rounded-lg animate-pulse" />
                        <div className="h-10 w-full bg-gray-50 rounded-lg animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchBar