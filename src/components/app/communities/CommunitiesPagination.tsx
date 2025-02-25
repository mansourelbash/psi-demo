'use client';

import { FC } from 'react';
import { CustomPagination } from '../CustomPagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect } from 'react';

type Props = {
  page: number;
  total: number;
};
const CommunitiesPagination: FC<Props> = ({ page, total }) => {
  const router = useRouter();
  const param = useSearchParams();
  const currenParams: Record<string, string> = {};
  const pathname = usePathname();
  function changePageHandler(page: number): void {
    router.push(
      pathname + '?' + queryString.stringify({ ...currenParams, page })
    );
  }
  useEffect(() => {
    param.entries().forEach(([key, value]) => {
      currenParams[key] = value;
    });
  }, [param.entries()]);
  return (
    <CustomPagination
      currentPage={page}
      totalPages={total}
      onPageChange={changePageHandler}
    />
  );
};
export default CommunitiesPagination;
