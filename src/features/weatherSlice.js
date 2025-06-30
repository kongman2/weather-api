import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeatherByCity } from '../api/weatherApi'

export const fetchWeatherByCity = createAsyncThunk('weather/fetchWeatherByCity', async (city, { rejectWithValue }) => {
   try {
      const result = await getWeatherByCity(city)

      return result
   } catch (err) {
      return rejectWithValue('날씨 정보를 불러올 수 없습니다.')
   }
})
const weatherSlice = createSlice({
   name: 'weather',
   initialState: {
      data: null,
      loading: false,
      error: null,
   },
   reducers: {
      resetWeather: (state) => {
         state.data = null
         state.loading = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchWeatherByCity.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
         })
         .addCase(fetchWeatherByCity.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export const { resetWeather } = weatherSlice.actions
export default weatherSlice.reducer
