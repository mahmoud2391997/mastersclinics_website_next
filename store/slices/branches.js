import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";

// Async thunk to fetch all branches
export const fetchBranches = createAsyncThunk(
    'branches/fetchBranches',
    async (_, thunkAPI) => {
        try {
            const branches = await get('/branches');
            console.log("Fetched branches:", branches);
            return branches;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch branch by ID
export const fetchBranchById = createAsyncThunk(
    'branches/fetchBranchById',
    async (id, thunkAPI) => {
        try {
            const branch = await getById('/branches', id);
            console.log("Fetched branch by ID:", branch);
            return branch;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const branchesSlice = createSlice({
    name: 'branches',
    initialState: {
        items: [],
        selectedBranch: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchBranches
            .addCase(fetchBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchBranchById
            .addCase(fetchBranchById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranchById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBranch = action.payload;
            })
            .addCase(fetchBranchById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default branchesSlice.reducer;
