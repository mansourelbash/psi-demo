'use client';

import { AppSelect } from '@/components/app/AppSelect';
import CurrencyConverter from '@/components/app/CurrencyConverter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyH2 } from '@/components/ui/typography';
import { UnitModel } from '@/types/Unit';
import { useReducer } from 'react';
import { Phone } from '@phosphor-icons/react/dist/ssr';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useAtom } from 'jotai';
import { settingsAtom } from '@/atoms/settingsAtoms';
type Props = {
  unit: UnitModel;
  initialInterest: number;
};

type initialStateType = {
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  propertyInsurance: number;
  hoaFees: number;
};
export const MortgageCalculatorSection = ({ unit, initialInterest }: Props) => {
  const [settings] = useAtom(settingsAtom);
  const initialState = {
    downPayment: unit.selling_price * 0.2,
    loanTerm: 25,
    interestRate: initialInterest,
    propertyTax: 0,
    propertyInsurance: 0,
    hoaFees: 0,
  };
  const reducer = (
    state: initialStateType,
    action: { type: keyof initialStateType; payload: number }
  ) => {
    switch (action.type) {
      case 'downPayment':
        return { ...state, downPayment: action.payload };
      case 'loanTerm':
        return { ...state, loanTerm: action.payload };
      case 'interestRate':
        return { ...state, interestRate: action.payload };
      case 'propertyTax':
        return { ...state, propertyTax: action.payload };
      case 'propertyInsurance':
        return { ...state, propertyInsurance: action.payload };
      case 'hoaFees':
        return { ...state, hoaFees: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function calculateMortgage(
    principal: number,
    years: number,
    annualInterestRate: number = 2.5,
    downPayment: number = state.downPayment
  ): number {
    // Convert annual interest rate to a monthly rate (divide by 12)
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    // Total number of payments (loan term in months)
    const totalPayments = years * 12;

    // Mortgage formula
    const monthlyPayment =
      ((principal - downPayment) *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    return +monthlyPayment.toFixed(1);
  }
  return (
    <div className="space-y-9 mt-[70px] bg-secondary-white rounded-[21px] px-6 sm:px-12 lg:px-24 py-8 sm:py-10 lg:py-12">
    <TypographyH2 className="font-medium text-center sm:text-left">
      Mortgage Calculator
    </TypographyH2>
  
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
      <div className="space-y-6">
        <div className="gap-3.5 flex flex-col">
          <Label>Property Price</Label>
          <div className="relative">
            <Input
              placeholder="Price"
              defaultValue={unit.selling_price}
              readOnly
              className="bg-background disabled:opacity-100"
            />
            <span className="absolute top-1/2 -translate-y-1/2 end-4 font-medium pointer-events-none uppercase">
              {settings.currency}
            </span>
          </div>
        </div>
  
        <div className="gap-3.5 flex flex-col">
          <Label>Down Payment</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Price"
              value={state.downPayment}
              className="bg-background sm:w-3/4 w-full"
              type="number"
              step={1000}
              onChange={(e) =>
                dispatch({
                  type: "downPayment",
                  payload: e.target.valueAsNumber ?? 0,
                })
              }
            />
            <Input
              placeholder="Price"
              value={
                state.downPayment
                  ? `${((state.downPayment / unit.selling_price) * 100).toFixed(0)}%`
                  : 0
              }
              readOnly
              className="bg-background sm:w-1/4 w-full text-center"
            />
          </div>
        </div>
  
        <div className="gap-3.5 flex flex-col">
          <Label>Mortgage Term</Label>
          <AppSelect
            data={Array.from({ length: 25 }, (_, i) => ({
              label: `${i + 1} Years`,
              value: (i + 1).toString(),
            }))}
            variant={"card"}
            value={state.loanTerm.toString()}
            searchable={false}
            placeholder="Mortgage Term"
            onChange={(e) =>
              dispatch({
                type: "loanTerm",
                payload: +e,
              })
            }
          />
        </div>
  
        <div className="gap-3.5 flex flex-col">
          <Label>Interest Rate</Label>
          <Input
            placeholder="Rate"
            value={2.5}
            readOnly
            className="bg-background"
          />
        </div>
      </div>
  
      <div className="bg-[#FFFFFF] flex flex-col items-center justify-center text-center p-6 rounded-lg">
        <TypographyH2 className="text-2xl font-medium">
          for {state.loanTerm} years
        </TypographyH2>
        <TypographyH2 className="text-5xl font-semibold text-[#E0592A]">
          <CurrencyConverter>
            {state.loanTerm &&
              calculateMortgage(unit.selling_price, state.loanTerm)}
          </CurrencyConverter>
        </TypographyH2>
        <TypographyH2 className="text-sm font-medium my-5">
          *Schedule a Consultation
        </TypographyH2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-center">
          <Button className="w-full sm:w-48 text-lg">
            <Phone size={20} />
            Call
          </Button>
          <Button className="bg-[#60C54F] w-full sm:w-48 text-lg">
            <WhatsAppIcon />
            Whatsapp
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  );
};
