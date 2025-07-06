import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";
import localBranches from "../../pages/branches/branches.json"; // Import the static data

export const fetchBranches = createAsyncThunk(
    'branches/fetchBranches',
    async (_, thunkAPI) => {
        try {
            const branches = await get('/branches');
            console.log("Fetched branches:", branches);
            
            // If API returns no data or empty array, use local branches data
            if (!branches || branches.length === 0) {
                return localBranches;
            }
            return branches;
        } catch (error) {
            // If API fails, return local branches data
            return localBranches;
        }
    }
);

export const fetchBranchById = createAsyncThunk(
    'branches/fetchBranchById',
    async (id, thunkAPI) => {
        try {
            const branch = await getById('/branches', id);
            console.log("Fetched branch by ID:", branch);
            
            // If API returns no data, try to find in local branches
            if (!branch) {
                const localBranch = localBranches.find(b => b.id === id);
                if (localBranch) return localBranch;
                throw new Error('Branch not found');
            }
            return branch;
        } catch (error) {
            // If API fails, try to find in local branches
            const localBranch = localBranches.find(b => b.id === id);
            if (localBranch) return localBranch;
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
            .addCase(fetchBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                // This case won't be reached since we return local data on error
                state.loading = false;
                state.error = action.payload;
            })
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