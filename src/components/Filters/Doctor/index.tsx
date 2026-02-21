"use client";

import { useState } from "react";
import { MotionDiv } from '@/lib/motion';
import { Search, ArrowUpDown, Calendar, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DoctorFiltersProps {
    onApplyFilters: (filters: { query: string; sort: string; day: string; startTime: string; endTime: string; limit: string; }) => void;
    onClearFilters: () => void;
    currentQuery: string;
    currentSort: string;
    currentDay: string;
    currentStartTime: string;
    currentEndTime: string;
    currentLimit: string;
}

const DoctorFilter = ({ onApplyFilters, onClearFilters, currentQuery, currentSort, currentDay, currentStartTime, currentEndTime, currentLimit }: DoctorFiltersProps) => {
    const [filters, setFilters] = useState({
        query: currentQuery,
        sort: currentSort || 'name_asc',
        day: currentDay || 'all',
        startTime: currentStartTime || '',
        endTime: currentEndTime || '',
        limit: currentLimit || '10'
    });

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        onApplyFilters(filters);
    };

    const handleClear = () => {
        setFilters({
            query: '',
            sort: 'name_asc',
            day: 'all',
            startTime: '',
            endTime: '',
            limit: '10'
        });
        onClearFilters();
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <MotionDiv className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-rows-1 md:grid-rows-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="relative grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search doctors by name..."
                            value={filters.query}
                            onChange={(e) => updateFilter('query', e.target.value)}
                            className="pl-10 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    
                    <div className="w-full shrink-0">
                        <Select value={filters.sort} onValueChange={(val) => updateFilter('sort', val)}>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-transparent cursor-pointer w-full">
                                <div className="flex items-center gap-2">
                                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                                    <SelectValue placeholder="Sort by" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name_asc" className="cursor-pointer">Name (A-Z)</SelectItem>
                                <SelectItem value="name_desc" className="cursor-pointer">Name (Z-A)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="w-full shrink-0">
                        <Select value={filters.day} onValueChange={(val) => updateFilter('day', val)}>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-transparent cursor-pointer w-full">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <SelectValue placeholder="Select Day" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="cursor-pointer">All Days</SelectItem>
                                {days.map((d) => (
                                    <SelectItem key={d} value={d} className="cursor-pointer">{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 w-full grow">
                        <div className="relative w-full">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                                type="time" 
                                value={filters.startTime} 
                                onChange={(e) => updateFilter('startTime', e.target.value)} 
                                className="pl-10 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white transition-all w-full cursor-text"
                            />
                        </div>
                        <span className="text-gray-400">to</span>
                        <div className="relative w-full">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                                type="time" 
                                value={filters.endTime} 
                                onChange={(e) => updateFilter('endTime', e.target.value)} 
                                className="pl-10 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white transition-all w-full cursor-text"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="w-full shrink-0">
                        <Select value={filters.limit} onValueChange={(val) => updateFilter('limit', val)}>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-transparent cursor-pointer w-full">
                                <SelectValue placeholder="Per Page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10" className="cursor-pointer">10 per page</SelectItem>
                                <SelectItem value="25" className="cursor-pointer">18 per page</SelectItem>
                                <SelectItem value="50" className="cursor-pointer">27 per page</SelectItem>
                                <SelectItem value="all" className="cursor-pointer">All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto ml-auto">
                        <Button variant="outline" onClick={handleClear} className="flex-1 md:flex-none cursor-pointer">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                        <Button onClick={handleSearch} className="flex-1 md:flex-none cursor-pointer">
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

export default DoctorFilter;
