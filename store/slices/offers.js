import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";

// Local fallback data matching your component's schema
const localOffers = [
  {
    id: '1',
    title: 'فحص شامل بخصم 30%',
    description: 'احصل على فحص طبي شامل بخصم 30% لجميع الفحوصات الأساسية',
    discount: 30,
    validUntil: '2023-12-31',
    image: '/offers/comprehensive-checkup.jpg',
    branches: ['alawali', 'alkhalidiyah'],
    terms: 'هذا العرض ساري لمرة واحدة لكل مريض ولا يمكن جمعه مع عروض أخرى'
  },
  {
    id: '2',
    title: 'حزمة العناية بالأسنان',
    description: 'تنظيف وفحص الأسنان مع تبييض مجاني',
    discount: 25,
    validUntil: '2023-11-30',
    image: '/offers/dental-care.jpg',
    branches: ['alshatee', 'albasateen'],
    terms: 'يشمل العرض تنظيف الأسنان وفحصها فقط'
  },
  {
    id: '3',
    title: 'كشف القلب بخصم 40%',
    description: 'فحص القلب والايكو بخصم 40% للمرة الأولى',
    discount: 40,
    validUntil: '2023-10-15',
    image: '/offers/heart-check.jpg',
    branches: ['alkhalidiyah'],
    terms: 'يشمل الفحص الأساسي فقط'
  }
];

export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (_, thunkAPI) => {
    try {
      const offers = await get('/offers/active');
      console.log("Fetched offers:", offers);
      
      // If API returns no data or empty array, use local offers data
      if (!offers || offers.length === 0) {
        return localOffers;
      }
      return offers;
    } catch (error) {
      // If API fails, return local offers data
      return localOffers;
    }
  }
);

export const fetchOfferById = createAsyncThunk(
  'offers/fetchOfferById',
  async (id, thunkAPI) => {
    try {
      const offer = await getById('/offers', id);
      console.log("Fetched offer by ID:", offer);
      
      // If API returns no data, try to find in local offers
      if (!offer) {
        const localOffer = localOffers.find(o => o.id === id);
        if (localOffer) return localOffer;
        throw new Error('Offer not found');
      }
      return offer;
    } catch (error) {
      // If API fails, try to find in local offers
      const localOffer = localOffers.find(o => o.id === id);
      if (localOffer) return localOffer;
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
  reducers: {
    // You can add any manual reducers here if needed
    clearSelectedOffer: (state) => {
      state.selectedOffer = null;
      state.selectedOfferLoading = false;
      state.selectedOfferError = null;
    }
  },
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

export const { clearSelectedOffer } = offersSlice.actions;
export default offersSlice.reducer;