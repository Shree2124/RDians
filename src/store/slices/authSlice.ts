import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth.type";
import { User } from "@/types/user.type";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false, // start with false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login action using parameters instead of API call
    login(  
      state,
      action: PayloadAction<{ username: string; password: string; role: "admin" | "citizen" | "volunteer" | "coordinator" | "agency" }>
    ) {
      const { username, password, role } = action.payload;

      // API call would go here, but commented out
      // const user = await api.login(username, password);

      // directly set user from payload
      state.user = { username, role }; // You can add more fields if needed
      state.isAuthenticated = true;
      state.loading = false;
    },

    // logout action
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
