import MapSearch from "@/components/app/map/MapSearch";
import { Container } from "@/components/ui/container";

const MapSection = async() => {

  // const dataMapItems = await getFilterationSearchData()
  // MapItems={dataMapItems}
  
  return (
    <Container>
        <MapSearch />
    </Container>
  );
};

export default MapSection;
