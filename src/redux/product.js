import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockapi from './api/mockapi';

export const fetchProducts = createAsyncThunk(
    'auth/fetchProducts',
    async () => {
        const res = await mockapi.get('products', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        });
        return res.data;
    }
)

export const fetchProduct = createAsyncThunk(
    'auth/fetchProduct',
    async (id) => {
        const res = await mockapi.get(`products/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        });
        return res.data;
    }
)

export const createProduct = createAsyncThunk(
    'auth/createProduct',
    async (data) => {
        const res = await mockapi.post('products', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        });
        return res.data
    }
)

export const editProduct = createAsyncThunk(
    'auth/editProduct',
    async ({ id, data }) => {
        const res = await mockapi.put(`products/${id}`, data);
        return res.data;
    }
)

export const deleteProduct = createAsyncThunk(
    'auth/deleteProduct',
    async (id) => {
        const res = await mockapi.delete(`products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        });
        return res.data;
    }
)

const initialState = {
    products: null,
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        // ======= products ======= //
        [fetchProducts.fulfilled]: (state, action) => {
            return { ...state, loading: false, products: action.payload }
        },
        // ======= product ======= //
        [fetchProduct.pending]: (state) => {
            return { ...state, loading: true }
        },
        [fetchProduct.fulfilled]: (state, action) => {
            return { ...state, loading: false, product: action.payload }
        },
        // ======= create ======= //
        [createProduct.fulfilled]: (state, action) => {
            window.location.reload()
            return { ...state, loading: false }
        },
        // ======= edit ======= //
        [editProduct.fulfilled]: (state, action) => {
            window.location.reload()
            return { ...state, loading: false }
        },
        // ======= delete ======= //
        [deleteProduct.fulfilled]: (state, action) => {
            window.location.reload()
            return { ...state, loading: false }
        },
    }
})


export default productSlice.reducer;
