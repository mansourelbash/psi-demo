'use server'

import { revalidatePath } from "next/cache";

const DEVELOPER_URL = `${process.env.API_URL}/developers`;

export const getDevelopers = async (page: number, per_page: number): Promise<DeveloperModel> => {
    const res = await fetch(`${DEVELOPER_URL}?page=${page}&per_page=${per_page}`, {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`API request failed with status ${res.status}`);
    }
    return await res.json();
  };