import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
};

const Paginator = ({ currentPage, totalPages }: PaginatorProps) => {
  if (!currentPage) {
    currentPage = 1;
  }

  const maxVisibleButtons = 7;
  const firstPage = 1;
  const lastPage = totalPages;
  const isFirstPage = firstPage === currentPage;
  const isLastPage = lastPage === currentPage;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const totalExceedsMaxVisibleButtons = totalPages > maxVisibleButtons;
  const showEllipseStart = currentPage >= maxVisibleButtons - 2 && totalExceedsMaxVisibleButtons;
  const showEllipseEnd =
    currentPage <= totalPages - maxVisibleButtons + 3 && totalExceedsMaxVisibleButtons;

  const allPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const firstPages = allPages.slice(0, maxVisibleButtons - 2);
  const lastPages = allPages.slice(allPages.length - maxVisibleButtons + 2, allPages.length);
  let pages = [];

  if (totalExceedsMaxVisibleButtons) {
    if (!showEllipseStart) {
      pages = [...firstPages, null, lastPage];
    } else if (!showEllipseEnd) {
      pages = [firstPage, null, ...lastPages];
    } else {
      pages = [firstPage, null, prevPage, currentPage, nextPage, null, lastPage];
    }
  } else {
    pages = allPages;
  }

  const path = usePathname();
  const searchParams = useSearchParams();

  const createUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return `${path}?${params}`;
    },
    [path, searchParams]
  );

  const pageItems = (
    <>
      {pages.map((page, index) => {
        if (page) {
          return (
            <PaginationItem key={index}>
              <PaginationLink href={createUrl(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        }
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      })}
    </>
  );

  return (
    <Pagination>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious href={createUrl(prevPage)} />
          </PaginationItem>
        )}

        {pageItems}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext href={createUrl(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
