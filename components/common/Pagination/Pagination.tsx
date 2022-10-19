import {FC, useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import {
  Pagination as HeadlessPagination,
  PrevButton,
  NextButton,
  PageButton,
} from 'react-headless-pagination';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}

const paginationButton =
  'flex flex-shrink-0 items-center justify-center w-10 h-10 bg-white border rounded-full cursor-pointer border-grayLineBased';

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onChangePage,
}) => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(currentPage - 1);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
    onChangePage(page + 1);
  };

  return (
    <HeadlessPagination
      className="flex w-full select-none items-center justify-center gap-2 py-5 text-sm"
      currentPage={page}
      setCurrentPage={handlePageChange}
      edgePageCount={2}
      middlePagesSiblingCount={1}
      totalPages={totalPage}
      truncableClassName="w-10 px-0.5 text-center"
      truncableText="..."
    >
      <PrevButton className={paginationButton}>
        <ChevronLeftIcon className="w-5" />
      </PrevButton>
      <PageButton
        activeClassName="bg-primary text-white"
        className={paginationButton}
      />
      <NextButton className={paginationButton}>
        <ChevronRightIcon className="w-5" />
      </NextButton>
    </HeadlessPagination>
  );
};
