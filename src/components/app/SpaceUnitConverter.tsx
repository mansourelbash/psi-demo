'use client';

import { settingsAtom, Sizes } from '@/atoms/settingsAtoms';
import { useAtom } from 'jotai';
import { FC } from 'react';

type ChildrenProps = { range?: false; children: number };
type RangeProps = { range: true; rangeValues: number[] };
type Props = {
  // children?: number | null;
  className?: string;
  emptyValue?: string;
  // range?: boolean;
  // rangeValues?: number[];
} & (ChildrenProps | RangeProps);
const SpaceUnitConverter: FC<Props> = ({
  className,
  emptyValue,
  range,
  // rangeValues,
  // children,
  ...props
}) => {
  const [settings] = useAtom(settingsAtom);
  if (
    (range && !(props as RangeProps).rangeValues.length) ||
    (!range && !(props as ChildrenProps).children)
  ) {
    return emptyValue ?? null;
  }
  switch (settings.size) {
    case Sizes.SQ_M:
      return (
        <>
          {range
            ? (props as RangeProps).rangeValues
                ?.map((value) => (value / 0.092903).toFixed(2))
                .join(' - ')
            : ((props as ChildrenProps).children / 0.092903).toFixed(2)}{' '}
          <span className={className}>sq.m</span>
        </>
      );
    default:
      return (
        <>
          {range
            ? (props as RangeProps).rangeValues
                ?.map((value) => value.toFixed(2))
                .join(' - ')
            : (props as ChildrenProps).children}{' '}
          <span className={className}>sq.ft</span>
        </>
      );
  }
};

export default SpaceUnitConverter;
