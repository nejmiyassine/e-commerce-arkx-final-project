import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
    products: [],
    product: {},
    isLoading: false,
    error: null,
};

// Get All Products
export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('products');
            return response.data.data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (productById, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `products/product/${productById}`,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

// Edit Product
export const editProduct = createAsyncThunk(
    'products/editProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`products/${id}`, data);
            return response.data.data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`products/${id}`);
            return response.data.data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

// Create Product
export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post('products', productData);
            return response.data.data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (categories, { rejectWithValue }) => {
        try {
            const response = await axios.get('products/categories', categories);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.products = [];
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
                state.error = action.error;
            })
            // Get Product By Id
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
                state.product = {};
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.product = {};
                state.error = action.error;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.map((product) =>
                    product._id === action.payload._id
                        ? action.payload
                        : product
                );

                state.error = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                // state.editedProduct = null;
                state.error = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                // state.deletedProduct = null;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedProductId = action.payload._id;

                state.products = state.products.filter(
                    (product) => product._id !== deletedProductId
                );

                state.error = null;
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                // state.deletedProduct = null;
                state.error = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

            // Fetch Product By Category Name
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
                state.products = [];
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
                state.error = action.payload
                    ? action.payload.message
                    : 'Failed to fetch products';
            });
    },
});

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;
