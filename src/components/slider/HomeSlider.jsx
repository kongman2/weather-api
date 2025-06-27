import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeatherByCity } from '../../features/weatherSlice'
import { Box, Card, CardContent, Typography } from '@mui/material'
import '../css/HomeSlider.css'

const popularCities = ['서울', '부산', '인천', '대구', '대전', '광주', '제주', '수원']
const HomeSlider = () => {
   const dispatch = useDispatch()
   const [weatherList, setWeatherList] = useState([])
   const [currentIndex, setCurrentIndex] = useState(0)
   const cardsPerPage = 4
   useEffect(() => {
      Promise.all(popularCities.map((city) => dispatch(fetchWeatherByCity(city)).unwrap()))
         .then((results) => setWeatherList(results))
         .catch((err) => console.error(err))
   }, [dispatch])
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + cardsPerPage) % weatherList.length)
      }, 4000)
      return () => clearInterval(interval)
   }, [weatherList])
   if (!weatherList.length) return <Typography>날씨 불러오는 중...</Typography>
   const visibleCards = weatherList.slice(currentIndex, currentIndex + cardsPerPage)
   if (visibleCards.length < cardsPerPage) {
      visibleCards.push(...weatherList.slice(0, cardsPerPage - visibleCards.length))
   }
   return (
      <div className="slider">
         <div className="title">
            <img src="/images/logoimg.png" alt="로고" />
            <h3>Regional Weather</h3>
         </div>
         <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} sx={{ mt: 3 }}>
            {visibleCards.map((weather) => (
               <Box key={weather.city} sx={{ width: '100%', maxWidth: 240, flex: '1 1 22%', minWidth: 180 }} className="card-box">
                  <Card className="card" sx={{ textAlign: 'center', padding: 1 }}>
                     <CardContent>
                        <Typography variant="h6">{weather.city}</Typography>
                        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} width={60} />
                        <Typography>{weather.temp}°C</Typography>
                        <Typography style={{ fontSize: '0.rem' }}>{weather.description}</Typography>
                     </CardContent>
                  </Card>
               </Box>
            ))}
         </Box>
      </div>
   )
}

export default HomeSlider
