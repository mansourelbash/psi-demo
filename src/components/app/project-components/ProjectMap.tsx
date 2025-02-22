import { getLandmarks } from '@/services/properties';
import { AppLandmarksMap } from '../AppLandmarksMap';
import ProjectPageItem from './ProjectPageItem';
import { FC } from 'react';
import { ProjectComponentProps } from './model';

const ProjectMap: FC<ProjectComponentProps> = async ({ property }) => {
  const landmarks = await getLandmarks(property.id.toString());

  return (
    <ProjectPageItem title='Project Map'>
      <AppLandmarksMap landmarks={landmarks} itemLocation={property.location} />
    </ProjectPageItem>
  );
};
export default ProjectMap;
