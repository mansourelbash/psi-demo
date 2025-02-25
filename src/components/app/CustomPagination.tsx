'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  isMobile?: boolean;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
}: CustomPaginationProps) {
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - delta, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className='mt-5 mb-5'>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className='hover:cursor-pointer text-[#2C2D65] font-semibold'
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {showFirstLast && currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                className='hover:cursor-pointer text-[#2C2D65] font-semibold'
                onClick={() => onPageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? 'border-2 border-[#ECECEC] text-[#2C2D65] font-semibold'
                  : 'hover:cursor-pointer text-[#2C2D65] font-semibold'
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showFirstLast && currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className='hover:cursor-pointer text-[#2C2D65] font-semibold'
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              className='hover:cursor-pointer text-[#2C2D65] font-semibold'
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
