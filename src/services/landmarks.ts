


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PROPERTY_URL = `${API_URL}//widgets/homeLandMarks`;

export const getLandmarksByID = async (
    cityId: number
): Promise<[]> => {
  const res = await fetch(`${PROPERTY_URL}/${cityId}`, {
    cache: 'no-cache',
  });
  return res.json();
};
