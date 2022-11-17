import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Api from '../api/finnhub'
import { LOADING_STATUS } from './../constants'

export const getStockInfo = createAsyncThunk(
  'stock/fetchStockInfo',
  Api.fetchStockInfo,
)

interface StockInfo {
  c: number, // current price
  d: number, // change
  dp: number, // percent change
  h: number, // High price of day
  l: number, // low price of day
  o: number, // open price of day
  pc: number, // previous close of day
  t: number // timestamp
}

interface DetailState {
  stockInfo: StockInfo
  status: LOADING_STATUS // the status of fetching
}

const initialState: DetailState = {
  stockInfo: {
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    t: 0
  },
  status: LOADING_STATUS.REJECTED,
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockInfo.pending, (state) => {
      state.status = LOADING_STATUS.LOADING
    })

    builder.addCase(getStockInfo.fulfilled, (state, action) => {
      state.status = LOADING_STATUS.LOADED
      state.stockInfo = {...action.payload.data};
    })

    builder.addCase(getStockInfo.rejected, (state) => {
      state.status = LOADING_STATUS.FAILED
    })
  },
})

export default stockSlice.reducer
