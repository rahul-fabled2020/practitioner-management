import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { destroy as destroyPractitioner, fetchAll as fetchAllPractitioners } from '../../services/practitionerService';
import { PractitionerState } from '../../interfaces/states';
import { showErrorMessage } from '../../utils/toast';

const initialState: PractitionerState = {
  practitioners: [],
  isLoading: false,
};

const getPractitioners = createAsyncThunk('practitioners/getPractitioners', async () => {
  try {
    return fetchAllPractitioners();
  } catch (error: any) {
    return error?.response?.data?.error?.message || error.message;
  }
});
const deletePractitioner = createAsyncThunk('practitioners/deletePractitioner', async (id: string) => {
  try {
    return destroyPractitioner(id);
  } catch (error: any) {
    return error?.response?.data?.error?.message || error.message;
  }
});

const practitionerSlice = createSlice({
  name: 'practitioner',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET all
    builder.addCase(getPractitioners.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPractitioners.fulfilled, (state, action) => {
      state.isLoading = false;
      state.practitioners = action.payload || [];
    });
    builder.addCase(getPractitioners.rejected, (state, action) => {
      state.isLoading = false;
      showErrorMessage(action.error.message as string);
    });

    // Delete
    builder.addCase(deletePractitioner.rejected, (state, action) => {
      showErrorMessage(action.error.message as string);
    });
  },
});

export { getPractitioners, deletePractitioner };

export default practitionerSlice.reducer;
