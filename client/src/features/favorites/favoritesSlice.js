import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async (productId, { rejectWithValue }) => {
        try {
            const res = await API.post(
                '/favorites/addToFavorites',
                { productId },
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/favorites', { withCredentials: true });

            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const getFavoritesById = createAsyncThunk(
    'favorites/getFavoritesById',
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await API.get(`favorites/${customerId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const deleteFavorites = createAsyncThunk(
    'favorites/deleteFavorites',
    async ({ favoriteId }, { rejectWithValue }) => {
        try {
            const res = await API.delete(`favorites/${favoriteId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (state, action) => {
            state.push(action.payload);
        },
    },

    extraReducers: (builder) => {
        builder
            // Add To Favorites
            .addCase(addToFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = '';
                console.log('addToFavorites', state.data);
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //fetchFavorites
            .addCase(fetchFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = '';
                console.log('fetchFavorites', state.data);
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //deleteFavorites
            .addCase(deleteFavorites.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(deleteFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { favoriteId },
                } = action.meta;
                if (favoriteId) {
                    state.data = state.data.filter(
                        (favorite) => favorite._id !== favoriteId
                    );
                }
                state.error = '';
                console.log('fulfilled');
            })

            .addCase(deleteFavorites.rejected, (state, action) => {
                state.error = action.error.message;
                console.log('rejected');
            });
    },
});

export const { addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
