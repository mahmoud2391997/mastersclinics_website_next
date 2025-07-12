import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";
import localDepartments from "../../pages/departments/departments.json"; // Import the static data

// Async thunk for fetching all departments
export const fetchDepartments = createAsyncThunk(
    'departments/fetchDepartments',
    async (_, thunkAPI) => {
        try {
            const departments = await get('/departments');
            console.log("Fetched departments:", departments);
            
            // If API returns no data or empty array, use local departments data
            if (!departments || departments.length === 0) {
                return localDepartments;
            }
            return departments;
        } catch (error) {
            // If API fails, return local departments data
            return localDepartments;
        }
    }
);

// Async thunk for fetching single department by ID
export const fetchDepartmentById = createAsyncThunk(
    'departments/fetchDepartmentById',
    async (id, thunkAPI) => {
        try {
            const department = await getById('/departments', id);
            console.log("Fetched department by ID:", department);
            
            // If API returns no data, try to find in local departments
            if (!department) {
                const localDept = localDepartments.find(d => d.id === id);
                if (localDept) return localDept;
                throw new Error('Department not found');
            }
            return department;
        } catch (error) {
            // If API fails, try to find in local departments
            const localDept = localDepartments.find(d => d.id === id);
            if (localDept) return localDept;
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    selectedDepartment: null,
    loading: false,
    error: null,
};

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchDepartments actions
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                // This case won't be reached since we return local data on error
                state.loading = false;
                state.error = action.payload;
            })
            
            // Handle fetchDepartmentById actions
            .addCase(fetchDepartmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDepartment = action.payload;
            })
            .addCase(fetchDepartmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default departmentsSlice.reducer;