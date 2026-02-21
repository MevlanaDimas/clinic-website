'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { MotionDiv } from '@/lib/motion';

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({ totalPages, currentPage, onPageChange }: CustomPaginationProps) => {
    if (totalPages <= 1) return null;

    const renderPageButton = (page: number) => (
        <PaginationItem key={page}>
            <PaginationLink
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                }}
                isActive={currentPage === page}
                className="text-base"
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    );

    const renderEllipsis = (key: string) => (
        <PaginationItem key={key}>
            <PaginationEllipsis />
        </PaginationItem>
    );

    const renderPages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(renderPageButton(i));
            }
        } else {
            // Always show first page
            pages.push(renderPageButton(1));

            if (currentPage > 3) {
                pages.push(renderEllipsis("start-ellipsis"));
            }

            // Calculate start and end of the window around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if near the start
            if (currentPage <= 3) {
                end = Math.min(totalPages - 1, 4);
            }
            
            // Adjust if near the end
            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - 3);
            }

            for (let i = start; i <= end; i++) {
                pages.push(renderPageButton(i));
            }

            if (currentPage < totalPages - 2) {
                pages.push(renderEllipsis("end-ellipsis"));
            }

            // Always show last page
            pages.push(renderPageButton(totalPages));
        }

        return pages;
    };

    return (
        <MotionDiv initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) onPageChange(currentPage - 1);
                            }}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "pointer-events-none opacity-50 text-base" : "cursor-pointer text-base"}
                        />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) onPageChange(currentPage + 1);
                            }}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50 text-base" : "cursor-pointer text-base"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </MotionDiv>
    );
};

export default CustomPagination;