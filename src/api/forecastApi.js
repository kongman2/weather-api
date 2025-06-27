import axios from 'axios'
const API_KEY = import.meta.env.VITE_OW_API_KEY
const forecastApi = axios.create({
   baseURL: 'https://api.openweathermap.org/',
   timeout: 5000,
})
//도시명으로 위도/경도 조회
const getCoordsByCity = async (city) => {
   const res = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
         q: city,
         limit: 1,
         appid: API_KEY,
      },
   })
   if (res.data.length === 0) {
      throw new Error('도시를 찾을 수 없습니다.')
   }
   return {
      lat: res.data[0].lat,
      lon: res.data[0].lon,
   }
}
//위도/경도로 날씨 예보 가져오기
export const getForecastByCity = async (city) => {
   const { lat, lon } = await getCoordsByCity(city)
   const res = await forecastApi.get('data/2.5/forecast', {
      params: {
         lat,
         lon,
         appid: API_KEY,
         units: 'metric',
         lang: 'kr',
      },
   })
   return res.data.list
}
export default forecastApi
