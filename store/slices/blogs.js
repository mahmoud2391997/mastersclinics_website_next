import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, getById } from "../../pages/api/fetching";
import localBlogs from "../../helpers/api/blogs"; // Your local fallback data

export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async (_, thunkAPI) => {
        try {
            const blogs = await get('/blogs/active');
            if (!blogs || blogs.length === 0) {
                return localBlogs;
            }
            return blogs;
        } catch (error) {
            return localBlogs;
        }
    }
);

export const fetchBlogById = createAsyncThunk(
    'blogs/fetchBlogById',
    async (id, thunkAPI) => {
        try {
            const blog = await getById('/blogs', id);
            if (!blog) {
                const localBlog = localBlogs.find(b => b.id === id);
                if (localBlog) return localBlog;
                throw new Error('Blog not found');
            }
            return blog;
        } catch (error) {
            const localBlog = localBlogs.find(b => b.id === id);
            if (localBlog) return localBlog;
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        items: [],
        selectedBlog: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBlogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBlog = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blogsSlice.reducer;
