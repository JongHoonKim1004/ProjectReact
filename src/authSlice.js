// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: localStorage.getItem('token') || null,
  userInfo: null,
  loginType: localStorage.getItem('loginType') || null,
  user: null,
  userPoint: null,
  admin: null,
  member: null,
  memberPoint: null,
};




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);

      try {
        state.token = action.payload;
        const decoded = jwt_decode(action.payload);
        state.userInfo = decoded;
      } catch (error) {
        console.error("Invalid token", error);
        state.token = null;
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.userInfo = null;
      state.user = null;
      state.userPoint = null;
      state.loginType = null;
      state.admin = null;
      state.member = null;
      state.memberPoint = null;
      localStorage.removeItem('token');
      localStorage.removeItem('loginType');
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
      localStorage.setItem('loginType', action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserPoint: (state, action) => {
      state.userPoint = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    setMemberPoint: (state, action) => {
      state.memberPoint = action.payload;
    }
  },
});

export const { setToken, clearToken, setLoginType, setUser, setUserPoint, setAdmin, setMember, setMemberPoint } = authSlice.actions;
export default authSlice.reducer;
