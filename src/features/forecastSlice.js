import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getForecastByCity } from '../api/forecastApi'
export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (city, { rejectWithValue }) => {
   try {
      return await getForecastByCity(city)
   } catch (err) {
      return rejectWithValue('예보를 불러올 수 없습니다.')
   }
})
const forecastSlice = createSlice({
   name: 'forecast',
   initialState: {
      data: [],
      loading: false,
      error: null,
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchForecast.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchForecast.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
         })
         .addCase(fetchForecast.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export default forecastSlice.reducer
