'use client';

import { Currencies, settingsAtom } from '@/atoms/settingsAtoms';
import { useAtom } from 'jotai';
import { FC } from 'react';

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
  const formatNumber = (number: number): string => {
    const formattedNumber = new Intl.NumberFormat('en-US').format(
      +number.toFixed()
    );
    return formattedNumber;
  };
  if (!children) return emptyValue ?? null;
  switch (settings.currency) {
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
