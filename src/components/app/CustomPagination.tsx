"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - delta, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end === totalPages) {
      start = Math.max(totalPages - maxVisiblePages + 1, 1);
    } else if (start === 1) {
      end = Math.min(maxVisiblePages, totalPages);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-5 mb-5">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className={`font-medium ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed pointer-events-none"
                : "text-[#2C2D65] hover:cursor-pointer"
            }`}
            onClick={
              currentPage === 1
                ? undefined
                : () => onPageChange(currentPage - 1)
            }
          />
        </PaginationItem>

        {/* Show first page if needed */}
        {showFirstLast && visiblePages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                className="hover:cursor-pointer text-[#2C2D65] font-medium"
                onClick={() => onPageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {visiblePages[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "border-2 border-[#ECECEC] text-[#2C2D65] font-medium"
                  : "hover:cursor-pointer text-[#2C2D65] font-medium"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Show last page if needed */}
        {showFirstLast &&
          visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  className="hover:cursor-pointer text-[#2C2D65] font-medium"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className={`font-medium ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed pointer-events-none"
                : "text-[#2C2D65] hover:cursor-pointer"
            }`}
            onClick={
              currentPage === totalPages
                ? undefined
                : () => onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
