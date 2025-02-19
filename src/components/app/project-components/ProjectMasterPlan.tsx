import { ProjectComponent } from './model';
import ProjectPageItem from './ProjectPageItem';
import { TextHighlight } from '@/components/ui/typography';
import Image from 'next/image';

const ProjectMasterPlan: ProjectComponent = ({ property }) => {
  const masterImage = property.media?.find(
    (media) => media.category.id === 21794
  );
  if (!masterImage?.url?.preview) {
    return null;
  }
  return (
    <ProjectPageItem
      title={
        <>
          {property.name} <TextHighlight>Master Plan</TextHighlight>
        </>
      }
    >
      <Image
        src={masterImage.url?.preview}
        alt='master_plan'
        height={2000}
        width={2000}
      />
    </ProjectPageItem>
  );
};
export default ProjectMasterPlan;
