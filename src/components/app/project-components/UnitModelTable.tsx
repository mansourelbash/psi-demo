'use client';

import { FC } from 'react';
import { DataTable } from '../DataTable';
import { UnitModelModel } from '@/types/Unit';
import SpaceUnitConverter from '../SpaceUnitConverter';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column?: Column<TData, TValue>;
  title: string;
  className?: string;
}
export function DataTableColumnHeader<TData, TValue>({
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div
      className={cn(
        ' text-center text-lg font-normal capitalize text-[#414042]',
        className
      )}
    >
      {title}
    </div>
  );
}
const UnitModelTable: FC<{ data: UnitModelModel[] }> = ({ data }) => {
  return (
    <DataTable
      rowClassName='border-none odd:bg-[#F9F9F9]'
      headRowClassName='border-none bg-[#F9F9F9]'
      columns={[
        {
          accessorKey: 'unit_type',
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Type' />
          ),
          cell: ({ row }) =>
            (row.getValue('unit_type') as UnitModelModel['unit_type'])?.name,
        },
        {
          accessorKey: 'area',
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='size from' />
          ),
          cell: ({ row }) => (
            <SpaceUnitConverter>
              {row.getValue('area') as UnitModelModel['area']}
            </SpaceUnitConverter>
          ),
        },
        // {
        //   accessorKey: 'available',
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title='available' />
        //   ),
        //   cell: ({ row }) => {
        //     const unit = row.original;
        //     return (
        //       <>
        //         Rent {unit.units_rent_no}{' '}
        //         <span className='text-[#E0592A]'>
        //           Sale {unit.units_sale_no}
        //         </span>
        //       </>
        //     );
        //   },
        // },
        {
          accessorKey: 'media',
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title='floor plan' />
          ),
          cell: ({ row }) => {
            const unit = row.original;
            if (!unit.media?.length) {
              return '-';
            }
          },
        },
      ]}
      data={data}
      className=' text-center w-full'
    />
  );
};
export default UnitModelTable;
