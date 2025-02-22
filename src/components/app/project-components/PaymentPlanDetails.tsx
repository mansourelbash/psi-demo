'use client';

import { Installment, PaymentPlan } from '@/types/Shared';
import { FC, useState } from 'react';
import ButtonGroup from '../ButtonGroup';
import { TypographyH2 } from '@/components/ui/typography';
import { Dictionary, groupBy } from 'lodash';
import { InstallmentTypes } from '@/types/Property';
import { Button } from '@/components/ui/button';

const InstallmentItem: FC<{
  formattedInstallment: Dictionary<Installment[]>;
  type: InstallmentTypes;
  title: string;
}> = ({ formattedInstallment, type, title }) => {
  return (
    formattedInstallment[type] && (
      <div className='bg-[#FFFFFF]  w-full py-5 rounded-lg sm:w-[250px] flex items-center justify-evenly sm:justify-center gap-2 sm:flex-col'>
        <TypographyH2 className=' text-base lg:text-lg text-[#414042] font-normal capitalize'>
          {title}
        </TypographyH2>
        <TypographyH2 className='text-base sm:text-5xl text-[#E0592A] font-normal'>
          {(
            formattedInstallment[type].reduce(
              (prev, current) => prev + current.amount_percentage,
              0
            ) * 100
          ).toFixed(0) + '%'}
        </TypographyH2>
        {/* <TypographyH2 className=' text-base lg:text-lg text-[#414042] font-normal capitalize'>
          Purchase Date
        </TypographyH2> */}
      </div>
    )
  );
};

type PaymentPlanProps = {
  paymentPlans: PaymentPlan[];
};

const PaymentPlanDetails: FC<PaymentPlanProps> = ({ paymentPlans }) => {
  const [currentPlan, setCurrentPlan] = useState(0);
  const formattedInstallment = groupBy(
    paymentPlans[currentPlan].installments,
    'installment_type.id'
  );
  return (
    <div className='flex flex-col  items-center justify-center gap-5  '>
      {' '}
      <ButtonGroup
        categories={paymentPlans.map((_plan, i) => `Plan ${i + 1}`)}
        className='gap-5 my-4'
        onCategoryChange={(_, index) => setCurrentPlan(index)}
      />
      <div className='flex gap-5 flex-wrap justify-center items-center children:font-[Poppins] '>
        <InstallmentItem
          title='Down Payment'
          type={InstallmentTypes.DownPayment}
          formattedInstallment={formattedInstallment}
        />
        <InstallmentItem
          title='Installment'
          type={InstallmentTypes.Installment}
          formattedInstallment={formattedInstallment}
        />
        <InstallmentItem
          title='Handover Payment'
          type={InstallmentTypes.HandoverPayment}
          formattedInstallment={formattedInstallment}
        />
        <InstallmentItem
          title='POST HANDOVER'
          type={InstallmentTypes.PostHandoverInstallment}
          formattedInstallment={formattedInstallment}
        />
      </div>
      <Button className='text-base font-medium bg-[#2C2D65] my-5'>
        Download Full Payment Plan
      </Button>
    </div>
  );
};
export default PaymentPlanDetails;
