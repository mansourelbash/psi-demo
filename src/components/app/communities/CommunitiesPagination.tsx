'use client';

import { FC } from 'react';
import { CustomPagination } from '../CustomPagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  page: number;
  total: number;
};

const CommunitiesPagination: FC<Props> = ({ page, total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentParams, setCurrentParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setCurrentParams(params);
  }, [searchParams]);

  function changePageHandler(page: number): void {
    const newParams = new URLSearchParams(currentParams.toString());
    newParams.set('page', page.toString());
    
    if (page === 1) {
      newParams.delete('page');
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <CustomPagination
      currentPage={page}
      totalPages={total}
      onPageChange={changePageHandler}
    />
  );
};

export default CommunitiesPagination;