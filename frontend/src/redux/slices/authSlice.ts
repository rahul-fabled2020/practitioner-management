import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { SignInPayload, SignUpPayload } from '../../interfaces/interfaces';
import { AuthState } from '../../interfaces/states';
import { signIn as login, signUp as createUser } from '../../services/authService';
import { showErrorMessage } from '../../utils/toast';
import { getUserFromToken } from '../../utils/token';

const initialState: AuthState = { user: { name: '', email: '' }, accessToken: '', isLoading: false };

const signIn = createAsyncThunk('auth/signIn', async (payload: SignInPayload, thunkAPI) => {
  try {
    const response = await login(payload);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message);
  }
});
const signUp = createAsyncThunk('users/createUser', async (payload: SignUpPayload) => {
  try {
    const response = await createUser(payload);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.accessToken = '';
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      const { accessToken } = action.payload.data;

      state.accessToken = accessToken;
      state.user = getUserFromToken(accessToken);
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;

      showErrorMessage(action.error.message as string);
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      const user = action.payload.data;

      state.user = user;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      showErrorMessage(action.error.message as string);
    });
  },
});

export { signIn, signUp };
export const { setCredentials, logOut, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
