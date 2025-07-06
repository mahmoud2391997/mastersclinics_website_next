import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";
import localDevices from "../../helpers/api/projects"; // Import the static data

export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async (_, thunkAPI) => {
        try {
            const devices = await get('/devices');
            console.log("Fetched devices:", devices);
            
            // If API returns no data or empty array, use local devices data
            if (!devices || devices.length === 0) {
                return localDevices;
            }
            return devices;
        } catch (error) {
            // If API fails, return local devices data
            return localDevices;
        }
    }
);

export const fetchDeviceById = createAsyncThunk(
    'devices/fetchDeviceById',
    async (id, thunkAPI) => {
        try {
            const device = await getById('/devices', id);
            console.log("Fetched device by ID:", device);
            
            // If API returns no data, try to find in local devices
            if (!device) {
                const localDevice = localDevices.find(d => d.id === id);
                if (localDevice) return localDevice;
                throw new Error('Device not found');
            }
            return device;
        } catch (error) {
            // If API fails, try to find in local devices
            const localDevice = localDevices.find(d => d.id === id);
            if (localDevice) return localDevice;
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