import { User } from "@/components/app/auth/LoginForm";
import { fetchWithErrorHandling } from "@/lib/fetchErrorHandling";
import { LoginFormData, LoginApiResponse, RegisterApiResponse } from "@/types/auth";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (formData: LoginFormData): Promise<LoginApiResponse> => {
  const response = await fetchWithErrorHandling<LoginApiResponse>(`${API_URL}/auth/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })

  return response
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  phone: string | null;
  country_code: string;
  password: string;
  confirm_password: string;
}): Promise<RegisterApiResponse> => {

  const response = await fetchWithErrorHandling<RegisterApiResponse>(`${API_URL}/auth/clients/register` ,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  return response
};

export const logoutUser = async (): Promise<void> => {
  await fetchWithErrorHandling(`${API_URL}/auth/logout?all=true`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      "Accept": "application/json",
    },
  });
};


export const getCurrentUser = async (): Promise<User | null> => {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const response = await fetchWithErrorHandling<User>(`${API_URL}/auth/getCurrentUser`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  return response;
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await fetchWithErrorHandling(`${API_URL}/auth/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const { access_token, refresh_token } = response as { access_token: string, refresh_token: string };
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  return access_token;
};


export const authService = {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken
};