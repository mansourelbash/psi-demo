import { FC } from 'react';
import ProjectPageItem from './ProjectPageItem';
import { ProjectComponentProps } from './model';
import { TextHighlight } from '@/components/ui/typography';
import { getPropertyUnitModels } from '@/services/properties';
import { groupBy } from 'lodash';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import UnitModelTable from './UnitModelTable';

const ProjectFloorPlans: FC<ProjectComponentProps> = async ({ property }) => {
  const models = await getPropertyUnitModels(property.id.toString());
  if (models?.length === 0) {
    return null;
  }
  const groupedBy = groupBy(models, 'bedroom_no');
  return (
    <ProjectPageItem
      title={
        <>
          {property.name} <TextHighlight>Floor Plans</TextHighlight>
        </>
      }
    >
      <Accordion
        type='single'
        collapsible
        className='w-full  max-w-[1283px] mx-auto space-y-2.5'
      >
        {Object.entries(groupedBy).map(([key, value], index) => (
          <AccordionItem
            value={`unitModel-${index}`}
            key={`unitModel-${index}`}
            className=' border rounded-lg '
          >
            <AccordionTrigger className='text-lg px-3 bg-[#F9F9F9] font-medium '>
              {+key === 0 ? 'Studio' : key}
              {+key !== 0 && (+key > 1 ? ' Bedrooms' : ' Bedroom')}
            </AccordionTrigger>
            <AccordionContent className='text-base p-0'>
              <UnitModelTable data={value} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ProjectPageItem>
  );
};
export default ProjectFloorPlans;
