'use client';

import { settingsAtom, Sizes } from '@/atoms/settingsAtoms';
import { useAtom } from 'jotai';
import { FC } from 'react';

type Props = {
  children?: number | null;
  className?: string;
  emptyValue?: string;
};
const SpaceUnitConverter: FC<Props> = ({ children, className, emptyValue }) => {
  const [settings] = useAtom(settingsAtom);
  if (!children) {
    return emptyValue ?? null;
  }
  switch (settings.size) {
    case Sizes.SQ_M:
      return (
        <>
          {(children / 0.092903).toFixed(2)}{' '}
          <span className={className}>sq.m</span>
        </>
      );
    default:
      return (
        <>
          {children} <span className={className}>sq.ft</span>
        </>
      );
  }
};

export default SpaceUnitConverter;
