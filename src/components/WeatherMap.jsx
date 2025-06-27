import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { TextField, Button, Typography, Box } from '@mui/material'
import { fetchWeatherByCity } from '../features/weatherSlice'
import { OPENWEATHER_TILE_URL } from '../api/weatherApi'
import { Panel, InfoCard } from '../styles/StyledComponent'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
// leaflet 마커 이미지 깨짐 방지
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
function WeatherMap() {
   const { city } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const decodedCity = decodeURIComponent(city || '서울')
   const [inputCity, setInputCity] = useState(decodedCity)
   const { data, error } = useSelector((state) => state.weather)

   useEffect(() => {
      if (!city) {
         navigate('/map/서울', { replace: true })
      } else {
         dispatch(fetchWeatherByCity(decodedCity))
      }
   }, [city, dispatch, navigate])
   // 에러 발생 시
   useEffect(() => {
      if (error === '도시를 찾을 수 없습니다.') {
         navigate('/notfound')
      }
   }, [error, navigate])
   const handleSearch = (e) => {
      e.preventDefault()
      const trimmed = inputCity.trim()
      if (trimmed) {
         navigate(`/map/${encodeURIComponent(trimmed)}`)
      }
   }
   const position = data ? [data.lat, data.lon] : [37.5665, 126.978] // 서울 기본 좌표
   return (
      <Box sx={{ display: 'flex', width: '100%' }}>
         {/* :왼쪽_화살표: 왼쪽 패널 */}
         <Panel>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
               <img src="/images/logoimg.png" alt="로고" style={{ width: 28, marginRight: 8 }} />
               <Typography variant="h6" fontWeight="bold">
                  Regional Weather
               </Typography>
            </div>
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
               <TextField size="small" fullWidth value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="도시 이름을 입력하세요" />
               <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                  검색
               </Button>
            </Box>
            {data && (
               <InfoCard>
                  <Typography variant="h6">{data.city}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                     {data.temp}°C / {data.description}
                  </Typography>
                  <Typography variant="body2">체감온도: {data.feels_like}°C</Typography>
                  <Typography variant="body2">습도: {data.humidity}%</Typography>
                  <Typography variant="body2">풍속: {data.wind_speed} m/s</Typography>
                  <Button size="small" variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate(`/forecast/${data.city}`)}>
                     시간별 예보 보기
                  </Button>
               </InfoCard>
            )}
         </Panel>
         {/* :세계_지도: 오른쪽 지도 */}
         <Box sx={{ flexGrow: 1 }}>
            <MapContainer center={position} zoom={7} style={{ height: '600px', width: '100%' }}>
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
               <TileLayer url={OPENWEATHER_TILE_URL('clouds_new')} attribution="© OpenWeatherMap" opacity={0.6} />
               {data && (
                  <Marker position={[data.lat, data.lon]}>
                     <Popup>
                        <strong>{data.city}</strong>
                        <br />
                        {data.temp}°C / {data.description}
                     </Popup>
                  </Marker>
               )}
            </MapContainer>
         </Box>
      </Box>
   )
}
export default WeatherMap
