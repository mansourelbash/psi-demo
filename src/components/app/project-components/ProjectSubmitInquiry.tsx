import SubmitInquiry from '@/app/[locale]/[city]/(Home)/unit/[operation]/[slug]/submit-inquiry/SubmitInquiry';
import { ProjectComponent } from './model';


const ProjectSubmitInquiry: ProjectComponent = ({ property }) => {
  return (
    <SubmitInquiry
      propertyId={property.id}
      showUserClass
      bedrooms={0}
      bathrooms={0}
      unitTypes={property.unit_types}
    />
  );
};
export default ProjectSubmitInquiry;
