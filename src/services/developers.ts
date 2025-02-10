'use server'

import { DeveloperModel, DeveloperProfileModel, ProjectDeveloperModel } from "@/types/HeroDeveloper";
import { revalidatePath } from "next/cache";

const DEVELOPER_URL = `${process.env.API_URL}/developers`;

export const getDevelopers = async (page: number, per_page: number): Promise<DeveloperModel> => {
    const res = await fetch(`${DEVELOPER_URL}?page=${page}&per_page=${per_page}`, {
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`API request failed with status ${res.status}`);
    }
    return await res.json();
  };

  export const getDevelopersProfile = async (id:number): Promise<DeveloperProfileModel> => {
    const res = await fetch(`${DEVELOPER_URL}/${id}`, {
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`API request failed with status ${res.status}`);
    }
    return await res.json();
  };

  export const getProjectsDeveloper = async (id:number, page: number, per_page: number, ): Promise<ProjectDeveloperModel> => {
    const res = await fetch(`${DEVELOPER_URL}/projects/${id}?page=${page}&per_page=${per_page}`, {
      cache: 'force-cache',
    });
  
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`API request failed with status ${res.status}`);

    }
    return await res.json();
  };



  getProjectsDeveloper