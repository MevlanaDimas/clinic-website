"use client";

import { useState } from "react";
import { MotionDiv } from '@/lib/motion';
import { ArrowDownNarrowWide, CalendarDays, ChevronDown, ChevronUp, Funnel, ListFilterPlus, Search, SquareStack, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersState {
    query: string;
    category: string;
    limit: string;
    year: string;
    author: string;
    sort: string;
}

interface FiltersProps {
    onApplyFilters: (filters: FiltersState) => void;
    onClearFilters: () => void;
    categories: { id: string | number; name: string }[];
    years?: number[];
    timeFilterOptions?: { label: string; value: string }[];
    timeFilterLabel?: string;
    timeFilterAllLabel?: string;
    authors?: { id: string; name: string }[];
    currentQuery: string;
    currentLimit: string;
    currentCategory: string | null;
    currentYear: string | null;
    currentAuthor: string | null;
    currentSort: string | null;
    promoPage?: boolean;
}

const MediaFilters = ({ onApplyFilters, onClearFilters, categories, years, timeFilterOptions, timeFilterLabel = "Year", timeFilterAllLabel, authors, currentQuery, currentLimit, currentCategory, currentYear, currentAuthor, currentSort, promoPage }: FiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [filters, setFilters] = useState({
        query: currentQuery,
        category: currentCategory || '',
        author: currentAuthor || '',
        year: currentYear || '',
        sort: currentSort || 'newest',
        limit: currentLimit
    });

    const searchPlaceholder = promoPage ? 'Search promo...' : 'Search news...';

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const handleClear = () => {
        setFilters({
            query: '',
            category: '',
            author: '',
            year: '',
            sort: 'newest',
            limit: '10'
        });
        onClearFilters();
    };

    const timeOptions = timeFilterOptions || (years ? years.map(y => ({ label: String(y), value: String(y) })) : []);
    const allTimeLabel = timeFilterAllLabel || `All ${timeFilterLabel}s`;

    return (
        <MotionDiv className="mb-13 space-y-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative grow">
                    <Label htmlFor="search" className="sr-only">Search</Label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="text"
                        id="search"
                        value={filters.query}
                        onChange={(e) => updateFilter('query', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                            className="pl-9"
                        placeholder={searchPlaceholder}
                    />
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button
                        onClick={handleApply}
                        className="flex-1 md:flex-none min-w-25 cursor-pointer"
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-1 md:flex-none min-w-25 cursor-pointer"
                    >
                        <ListFilterPlus className="mr-2 h-4 w-4" />
                        Filters
                        {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {isExpanded && (
                <div className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Category Filter */}
                        <div className="md:col-span-1">
                                <Label htmlFor="category" className="mb-3 block">
                                    <SquareStack className="inline mr-2" />
                                    Category
                                </Label>
                            <Select value={filters.category || "all"} onValueChange={(val) => updateFilter('category', val === "all" ? "" : val)}>
                                <SelectTrigger id="category" className="w-full cursor-pointer">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="cursor-pointer">All Categories</SelectItem>
                                {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id || category.name)} className="cursor-pointer">
                                        {category.name}
                                        </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Author Filter */}
                        {authors && (
                        <div className="md:col-span-1">
                            <Label htmlFor="author" className="mb-3 block">
                                <UserRoundPen className="inline mr-2" />
                                Author
                            </Label>
                            <Select value={filters.author || "all"} onValueChange={(val) => updateFilter('author', val === "all" ? "" : val)}>
                                <SelectTrigger id="author" className="w-full cursor-pointer">
                                    <SelectValue placeholder="All Authors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="cursor-pointer">All Authors</SelectItem>
                                {authors.map((author) => (
                                        <SelectItem key={author.id} value={author.id} className="cursor-pointer">
                                        {author.name}
                                        </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        )}

                        {/* Time/Year Filter */}
                        <div className="md:col-span-1">
                            <Label htmlFor="year" className="mb-3 block">
                                <CalendarDays className="inline mr-2" />
                                {timeFilterLabel}
                            </Label>
                            <Select value={filters.year || "all"} onValueChange={(val) => updateFilter('year', val === "all" ? "" : val)}>
                                <SelectTrigger id="year" className="w-full cursor-pointer">
                                    <SelectValue placeholder={allTimeLabel} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="cursor-pointer">{allTimeLabel}</SelectItem>
                                {timeOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                                        {opt.label}
                                        </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort Filter */}
                        <div className="md:col-span-1">
                            <Label htmlFor="sort" className="mb-3 block">
                                <ArrowDownNarrowWide className="inline mr-2" />
                                Sort By
                            </Label>
                            <Select value={filters.sort} onValueChange={(val) => updateFilter('sort', val)}>
                                <SelectTrigger id="sort" className="w-full">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                                    <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Items per page */}
                        <div className="md:col-span-1">
                            <Label htmlFor="limit" className="mb-3 block">
                                <Funnel className="inline mr-2" />
                                Show
                            </Label>
                            <Select value={filters.limit} onValueChange={(val) => updateFilter('limit', val)}>
                                <SelectTrigger id="limit" className="w-full cursor-pointer">
                                    <SelectValue placeholder="Show" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10" className="cursor-pointer">10 per page</SelectItem>
                                    <SelectItem value="20" className="cursor-pointer">20 per page</SelectItem>
                                    <SelectItem value="50" className="cursor-pointer">50 per page</SelectItem>
                                    <SelectItem value="all" className="cursor-pointer">View All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className={`mt-8 flex justify-end gap-4 ${promoPage ? 'lg:col-span-2' : 'col-span-1'}`}>
                            <Button
                                variant="outline"
                                onClick={handleClear}
                                className="cursor-pointer"
                            >
                                Clear Filters
                            </Button>
                            <Button
                                onClick={handleApply}
                                className="cursor-pointer"
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </MotionDiv>
    );
}

export default MediaFilters;