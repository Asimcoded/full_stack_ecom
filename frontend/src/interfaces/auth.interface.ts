export interface User {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginInterface {
  email : String,
  password : String
}

export interface RegisterInterface {
  email : String,
  name : String,
  password : String
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginInterface) => Promise<void>;
  register: (data: RegisterInterface) => Promise<any>; // adjust return type as needed
  logout: () => void;
  isAuthenticated: boolean;
}