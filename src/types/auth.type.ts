import { User } from "./user.type";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
