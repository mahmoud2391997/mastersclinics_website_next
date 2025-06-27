import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";

// Async thunk to fetch all devices
export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async (_, thunkAPI) => {
        try {
            const devices = await get('/devices');
            console.log("Fetched devices:", devices);
            
            return devices;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch device by ID
export const fetchDeviceById = createAsyncThunk(
    'devices/fetchDeviceById',
    async (id, thunkAPI) => {
        try {
            const device = await getById('/devices', id);
            return device;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const devicesSlice = createSlice({
    name: 'devices',
    initialState: {
        items: [],
        selectedDevice: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchDevices
            .addCase(fetchDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchDeviceById
            .addCase(fetchDeviceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeviceById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDevice = action.payload;
            })
            .addCase(fetchDeviceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default devicesSlice.reducer;