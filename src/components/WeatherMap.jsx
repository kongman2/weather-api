import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { TextField, Button, Typography, Box } from '@mui/material'
import { fetchWeatherByCity } from '../features/weatherSlice'
import { OPENWEATHER_TILE_URL } from '../api/weatherApi'
import { Panel, InfoCard } from '../styles/StyledComponent'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
// leaflet 기본 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
function WeatherMap({ city }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { data, error } = useSelector((state) => state.weather)
   const [inputCity, setInputCity] = useState(decodeURIComponent(city))
   // 최초 로딩 시 데이터 불러오기
   useEffect(() => {
      if (city && city !== ':city') {
         dispatch(fetchWeatherByCity(city))
      }
   }, [city, dispatch])
   // 검색 제출 핸들러
   const handleSearch = (e) => {
      e.preventDefault()
      const trimmed = inputCity.trim()
      if (trimmed) navigate(`/map/${encodeURIComponent(trimmed)}`)
   }
   // 오류 시 NotFound 페이지 이동
   useEffect(() => {
      if (error === '도시를 찾을 수 없습니다.') {
         navigate('/notfound')
      }
   }, [error, navigate])
   const position = data ? [data.lat, data.lon] : [37.5665, 126.978] // 서울
   return (
      <Box sx={{ display: 'flex', width: '100%' }}>
         {/* :작은_파란색_다이아몬드: 왼쪽 패널 */}
         <Panel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <img src="/images/logoimg.png" style={{ width: 24, marginRight: 6 }} alt="logo" />
               <h3>Regional Weather</h3>
            </div>
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
               <TextField size="small" fullWidth value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="도시 이름" />
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
                  <Typography variant="body2">체감: {data.feels_like}°C</Typography>
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
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
               <TileLayer url={OPENWEATHER_TILE_URL('clouds_new')} opacity={0.6} />
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
