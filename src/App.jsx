import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import RegionalWeather from './pages/RegionalWeather'
import WeatherForecast from './pages/WeatherForecast'
import NotFound from './pages/NotFound'
function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />

         <Route path="/map/:city" element={<RegionalWeather />}></Route>
         <Route path="/map" element={<Navigate to="/map/서울" replace />} />

         <Route path="/forecast/:city" element={<WeatherForecast />} />

         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
