import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";
const localReviews = [
    {
        id: 1,
        title: 'Great Service',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum, nisi sapien bibendum nunc, vitae aliquam nisl nisi vitae nisl.',
        image: '/images/testimonial/testimonial-1.jpg',
        name: 'John Doe',
        designation: 'CEO, ABC Company',
        rating: 5,
    },
    {
        id: 2,
        title: 'Excellent Work',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum, nisi sapien bibendum nunc, vitae aliquam nisl nisi vitae nisl.',
        image: '/images/testimonial/testimonial-2.jpg',
        name: 'Jane Smith',
        designation: 'CTO, XYZ Company',
        rating: 4,
    },
    {
        id: 3,
        title: 'Highly Recommended',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum, nisi sapien bibendum nunc, vitae aliquam nisl nisi vitae nisl.',        image: '/images/testimonial/testimonial-3.jpg',
        name: 'Mike Johnson',
        designation: 'COO, 123 Company',
        rating: 5,
    }
]
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (_, thunkAPI) => {
        try {
            const reviews = await get('/testimonials/active');
            if (!reviews || reviews.length === 0) {
                return localReviews;
            }
            console.log(reviews);
            
            return reviews;
        } catch (error) {
            return localReviews;
        }
    }
);

export const fetchReviewById = createAsyncThunk(
    'reviews/fetchReviewById',
    async (id, thunkAPI) => {
        try {
            const review = await getById('/testimonials', id);
            if (!review) {
                const localReview = localReviews.find(r => r.id === id);
                if (localReview) return localReview;
                throw new Error('Review not found');
            }
            return review;
        } catch (error) {
            const localReview = localReviews.find(r => r.id === id);
            if (localReview) return localReview;
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        selectedReview: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchReviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewsSlice.reducer;
