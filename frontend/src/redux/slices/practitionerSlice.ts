import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  create as createPractitioner,
  destroy as destroyPractitioner,
  edit as editPractitioner,
  fetchAll as fetchAllPractitioners,
} from '../../services/practitionerService';
import { PractitionerState } from '../../interfaces/states';
import { showErrorMessage } from '../../utils/toast';
import { Practitioner } from '../../interfaces/interfaces';

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
const savePractitioner = createAsyncThunk('practitioners/savePractitioner', async (payload: Practitioner) => {
  try {
    return createPractitioner(payload);
  } catch (error: any) {
    return error?.response?.data?.error?.message || error.message;
  }
});
const updatePractitioner = createAsyncThunk(
  'practitioners/updatePractitioner',
  async ({ id, payload }: { id: string; payload: Practitioner }) => {
    try {
      return editPractitioner(id, payload);
    } catch (error: any) {
      return error?.response?.data?.error?.message || error.message;
    }
  }
);

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

    // Create
    builder.addCase(savePractitioner.rejected, (state, action) => {
      showErrorMessage(action.error.message as string);
    });

    // Update
    builder.addCase(updatePractitioner.rejected, (state, action) => {
      showErrorMessage(action.error.message as string);
    });
  },
});

export { getPractitioners, deletePractitioner, savePractitioner, updatePractitioner };

export default practitionerSlice.reducer;
