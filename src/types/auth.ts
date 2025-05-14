export interface SocialLoginData {
  source?: string;
  id_token?: string;
  access_token?: string;
  is_limited?: string;
  fullname?: string;
  authorization_code?: string;
}

export interface AuthModalProps {
  toggleModal: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export interface Permission {
  id: number;
  name: string;
}
export interface LoginApiResponse {
  id: string;
  name: string;
  email: string;
  status: number;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  country_code: string;
  phone: string;
  last_presence: {
    date: string;
    time_ago: string;
  };
  profile_image: string | null;
  roles: {
    id: number;
    name: string;
    permissions: Permission[];
  }[];
  created_at: string;
  access_token: string;
  refresh_token: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface Media {
  id: string;
  url: string;
  type: string;
}
export interface RegisterApiResponse {
  email: string;
  id: string;
  phone: string | null;
  is_super_admin: boolean;
  deactivated_at: string | null;
  country_code: string;
  updated_at: string;
  name: string;
  status: number;
  password: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  last_login: string | null;
  created_at: string;
  media: Media[];
  roles: {
    name: string;
    id: number;
    permissions: Permission[];
    users: {
      id: string;
      name: string;
      email: string;
    }[];
  }[];
}

export interface SocialButtonProps {
  icon: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export interface AuthData {
  access_token: string;
  refresh_token: string;
  id: string;
  name: string;
  email: string;
}