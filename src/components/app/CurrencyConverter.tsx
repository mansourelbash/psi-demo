'use client';

import { Currencies, settingsAtom } from '@/atoms/settingsAtoms';
// import { formatNumber } from '@/lib/utils';
import { useAtom } from 'jotai';
import { FC, useEffect, useState } from 'react';

type CurrencyConverterProps = {
  children?: number | null;
  className?: string;
  emptyValue?: string;
};
const CurrencyConverter: FC<CurrencyConverterProps> = ({
  children,
  className,
  emptyValue,
}) => {
  const [settings] = useAtom(settingsAtom);
  const [currency, setCurrency] = useState<Currencies | null>(null);

  useEffect(() => {
    setCurrency(settings.currency);
  }, [settings.currency]);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('en-US').format(+number.toFixed());
  };

  if (children === null || children === undefined) return emptyValue ?? null;

  if (!currency) return null; 

  switch (currency) {
    case Currencies.USD:
      return (
        <>
          {formatNumber(children * 0.27)} <span className={className}>$</span>
        </>
      );
    case Currencies.EUR:
      return (
        <>
          {formatNumber(children * 0.26)} <span className={className}>EUR</span>
        </>
      );
    default:
      return (
        <>
          {formatNumber(children)} <span className={className}>AED</span>
        </>
      );
  }
};

export default CurrencyConverter;
