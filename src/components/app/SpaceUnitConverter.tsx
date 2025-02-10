'use client';

import { settingsAtom, Sizes } from '@/atoms/settingsAtoms';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';

type Props = {
  children?: number | null;
  className?: string;
  emptyValue?: string;
};
const SpaceUnitConverter: FC<Props> = ({ children, className, emptyValue }) => {
  const [settings] = useAtom(settingsAtom);
  const [convertedValue, setConvertedValue] = useState<string | number | null>(null);

  useEffect(() => {
    if (!children) {
      setConvertedValue(emptyValue ?? null);
      return;
    }

    switch (settings.size) {
      case Sizes.SQ_M:
        setConvertedValue(`${(children / 0.092903).toFixed(2)} <span className=${className}>sq.m</span>`);
        break;
      default:
        setConvertedValue(`${children} <span className=${className}>sq.ft</span>`);
        break;
    }
  }, [children, settings.size, className, emptyValue]);

  if (!convertedValue) {
    return emptyValue ?? null;
  }

  return <div dangerouslySetInnerHTML={{ __html: convertedValue }} />;
};

export default SpaceUnitConverter;
