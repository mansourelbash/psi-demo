export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProfileData = async (id: string) => {
  const response = await fetch(`${API_URL}/agents/${id}`);
  const data = await response.json();
  return data;
};
export const getAreaOfSpecialistProjectsData = async (id: string) => {
  const response = await fetch(`${API_URL}/agents/properties/${id}`);
  const data = await response.json();
  return data;
};
export const getAreaOfSpecialistCommunitiesData = async (id: string) => {
  const response = await fetch(`${API_URL}/agents/communities/${id}`);
  const data = await response.json();
  return data;
};
export const getAreaOfSpecialistDevelopersData = async (id: string) => {
  const response = await fetch(
    `${API_URL}/developers?is_autocomplete=false&agent_id=${id}`
  );
  const data = await response.json();
  return data;
};
