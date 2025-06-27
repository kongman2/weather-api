import axios from 'axios'

const API_KEY = import.meta.env.VITE_OW_API_KEY

const weatherApi = axios.create({
   baseURL: 'https://api.openweathermap.org/',
   timeout: 5000,
})
// 도시명으로 위도/경도 좌표 가져오기 (Direct Geocoding API)
export const getCoordsByCity = async (city) => {
   const res = await weatherApi.get('geo/1.0/direct', {
      params: {
         q: city,
         limit: 1,
         appid: API_KEY,
      },
   })
   if (!res.data.length) throw new Error('도시를 찾을 수 없습니다.')
   const { lat, lon, name } = res.data[0]
   return { lat, lon, name }
}
//  위도/경도로 현재 날씨 가져오기
export const getWeatherByCoords = async (lat, lon) => {
   const res = await weatherApi.get('data/2.5/weather', {
      params: {
         lat,
         lon,
         appid: API_KEY,
         units: 'metric', // 섭씨
         lang: 'kr',
      },
   })
   return res.data
}
//  도시명으로 현재 날씨 한 번에 가져오기
export const getWeatherByCity = async (city) => {
   const { lat, lon, name } = await getCoordsByCity(city)
   const weather = await getWeatherByCoords(lat, lon)
   return {
      city: name,
      lat,
      lon,
      temp: weather.main.temp,
      description: weather.weather[0].description,
      icon: weather.weather[0].icon,
   }
}
//  OpenWeather 지도 타일 레이어 URL 생성
export const OPENWEATHER_TILE_URL = (layer) => `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`

export default weatherApi
