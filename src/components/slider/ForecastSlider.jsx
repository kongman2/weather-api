import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForecast } from '../../features/forecastSlice'
import { Typography, TextField, Button, Divider, CardContent } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import UmbrellaIcon from '@mui/icons-material/Umbrella'
import { Wrap, Main, Loading, Section, DateTitle, WeatherCard, DetailText, Title } from '../../styles/StyledComponent'
const dayBackgrounds = ['#E3F2FD', '#C2E6FF', '#92CCF5', '#67A3CD', '#4A93C7', '#0A4874']
function ForecastSlider() {
   const dispatch = useDispatch()
   const { data, loading, error } = useSelector((state) => state.forecast)
   const [city, setCity] = useState('서울')
   const [errorMessage, setErrorMessage] = useState('')
   useEffect(() => {
      dispatch(fetchForecast('서울'))
   }, [dispatch])
   const handleSubmit = (e) => {
      e.preventDefault()
      const trimmed = city.trim()
      if (!trimmed) {
         setErrorMessage('도시 이름을 입력해주세요.')
         return
      }
      setErrorMessage('')
      dispatch(fetchForecast(trimmed))
   }
   if (loading) {
      return (
         <div>
            <Loading />
         </div>
      )
   }
   if (error) {
      return (
         <div>
            <Typography align="center" color="error">
               오류 발생: {error}
            </Typography>
         </div>
      )
   }
   if (!data || data.length === 0) {
      return (
         <div>
            <Typography align="center">예보 데이터가 없습니다.</Typography>
         </div>
      )
   }
   const grouped = data.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0]
      if (!acc[date]) acc[date] = []
      acc[date].push(item)
      return acc
   }, {})
   return (
      <div className="slider">
         <Title>
            <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
               {city}의 5일간 시간별 날씨 예보
            </Typography>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '24px' }}>
               <TextField size="small" value={city} onChange={(e) => setCity(e.target.value)} placeholder="도시 이름을 입력하세요" sx={{ mr: 2 }} error={!!errorMessage} helperText={errorMessage} />
               <Button type="submit" variant="contained">
                  검색
               </Button>
            </form>
         </Title>
         {Object.entries(grouped).map(([date, items], index) => (
            <Section key={date} $bg={dayBackgrounds[index]} $dark={index >= 3}>
               <DateTitle>
                  {new Date(date).toLocaleDateString('ko-KR', {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                     weekday: 'long',
                  })}
               </DateTitle>
               <Swiper modules={[Autoplay, Navigation]} autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }} navigation spaceBetween={24} slidesPerView={'auto'} style={{ padding: '10px 0' }}>
                  {items.map((item) => (
                     <SwiperSlide key={item.dt} style={{ width: '240px' }}>
                        <WeatherCard>
                           <CardContent>
                              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} style={{ width: '64px', height: '64px' }} />
                              <Typography variant="h7" sx={{ mt: 1 }}>
                                 {item.main.temp.toFixed(1)}°C
                              </Typography>
                              <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666' }}>
                                 {item.weather[0].description}
                              </Typography>
                              <DetailText>
                                 <DeviceThermostatIcon fontSize="small" /> 체감: {item.main.feels_like.toFixed(1)}°C
                              </DetailText>
                              <DetailText>
                                 <WaterDropIcon fontSize="small" /> 습도: {item.main.humidity}%
                              </DetailText>
                              <DetailText>
                                 <AirIcon fontSize="small" /> 풍속: {item.wind.speed} m/s
                              </DetailText>
                              {item.rain?.['3h'] && (
                                 <DetailText>
                                    <UmbrellaIcon fontSize="small" /> 강수: {item.rain['3h']} mm
                                 </DetailText>
                              )}
                           </CardContent>
                        </WeatherCard>
                     </SwiperSlide>
                  ))}
               </Swiper>
               {index < Object.entries(grouped).length - 1 && <Divider sx={{ mt: 4 }} />}
            </Section>
         ))}
      </div>
   )
}
export default ForecastSlider
