import { getPropertyPaymentPlans } from '@/services/properties';
import { ProjectComponent } from './model';
import { TextHighlight, TypographyH2 } from '@/components/ui/typography';
import PaymentPlanDetails from './PaymentPlanDetails';

const ProjectPaymentPlans: ProjectComponent = async ({ property }) => {
  const paymentPlans = await getPropertyPaymentPlans(property.id);
  if (!paymentPlans?.length) {
    return null;
  }
  return (
    <div className='flex flex-col items-center justify-center bg-[#F9F9F9] gap-5  py-12'>
      <TypographyH2 className='capitalize'>
        {property.name} {''}
        <TextHighlight>Payment Plan</TextHighlight>
      </TypographyH2>
      <PaymentPlanDetails paymentPlans={paymentPlans} />
    </div>
  );
};
export default ProjectPaymentPlans;
