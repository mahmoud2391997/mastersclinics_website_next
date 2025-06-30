import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";

// Async thunk to fetch all offers
export const fetchOffers = createAsyncThunk(
    'offers/fetchOffers',
    async (_, thunkAPI) => {
        try {
            const offers = await get('/offers');
            console.log("Fetched offers:", offers);
            return offers;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch offer by ID
export const fetchOfferById = createAsyncThunk(
    'offers/fetchOfferById',
    async (id, thunkAPI) => {
        try {
            const offer = await getById('/offers', id);
            console.log("Fetched offer by ID:", offer);
            return offer;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const offersSlice = createSlice({
    name: 'offers',
    initialState: {
        items: [],
        itemsLoading: false,
        itemsError: null,

        selectedOffer: null,
        selectedOfferLoading: false,
        selectedOfferError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchOffers
            .addCase(fetchOffers.pending, (state) => {
                state.itemsLoading = true;
                state.itemsError = null;
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.itemsLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.itemsLoading = false;
                state.itemsError = action.payload;
            })
            // fetchOfferById
            .addCase(fetchOfferById.pending, (state) => {
                state.selectedOfferLoading = true;
                state.selectedOfferError = null;
            })
            .addCase(fetchOfferById.fulfilled, (state, action) => {
                state.selectedOfferLoading = false;
                state.selectedOffer = action.payload;
            })
            .addCase(fetchOfferById.rejected, (state, action) => {
                state.selectedOfferLoading = false;
                state.selectedOfferError = action.payload;
            });
    },
});

export default offersSlice.reducer;
