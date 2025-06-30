import { useParams } from 'react-router-dom'
import WeatherMap from '../components/WeatherMap'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
function RegionalWeather() {
   const { city } = useParams()
   if (!city) return null
   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherMap city={city} />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default RegionalWeather
