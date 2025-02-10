import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';

export const getInterestRate = async (): Promise<number> => {
  const res = await fetchWithErrorHandling<number>(
    `${process.env.API_URL}/mortgage/getInterestRate`
  );
  return res;
};
