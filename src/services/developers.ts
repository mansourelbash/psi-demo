"use server";

import {
  DeveloperModel,
  DeveloperProfileModel,
  ProjectDeveloperModel,
} from "@/types/HeroDeveloper";

const DEVELOPER_URL = `${process.env.API_URL}/developers`;

export const getDevelopers = async (
  page: number,
  per_page: number,
  options?: {
    query?: string;
    isAutocomplete?: boolean;
    cityId?: string
  }
): Promise<DeveloperModel> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
  });

  if (options?.query) {
    searchParams.append("q", options.query);
  }

  if (options?.isAutocomplete) {
    searchParams.append("is_autocomplete", "true");
  }
  if (options?.cityId) {
    searchParams.append("city_id", options.cityId);
  }

  const res = await fetch(
    `${DEVELOPER_URL}?${searchParams.toString()}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    throw new Error(`API request failed with status ${res.status}`);
  }
  return await res.json();
};

export const getDevelopersProfile = async (
  id: number
): Promise<DeveloperProfileModel> => {
  const res = await fetch(`${DEVELOPER_URL}/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    throw new Error(`API request failed with status ${res.status}`);
  }
  return await res.json();
};

export const getProjectsDeveloper = async (
  id: number,
  page: number,
  per_page: number
): Promise<ProjectDeveloperModel> => {

  const res = await fetch(
    `${DEVELOPER_URL}/projects/${id}?page=${page}&per_page=${per_page}`,
    { next: { revalidate: 3600 }}
  );

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    throw new Error(`API request failed with status ${res.status}`);
  }
  return await res.json();
};
