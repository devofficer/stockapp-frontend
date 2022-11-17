import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Api from '../api/finnhub'
import { LOADING_STATUS } from './../constants'

export const getCurrencyDetail = createAsyncThunk(
  'stock/fetchStockInfo',
  Api.fetchStockInfo,
)

interface DetailState {
  status: LOADING_STATUS // the status of fetching
}

const initialState: DetailState = {
  status: LOADING_STATUS.LOADING,
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrencyDetail.pending, (state) => {
      state.status = LOADING_STATUS.LOADING
    })

    builder.addCase(getCurrencyDetail.fulfilled, (state, action) => {
      state.status = LOADING_STATUS.LOADED
    })

    builder.addCase(getCurrencyDetail.rejected, (state) => {
      state.status = LOADING_STATUS.FAILED
    })
  },
})

export default stockSlice.reducer
