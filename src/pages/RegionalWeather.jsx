import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import WeatherMap from '../components/WeatherMap'

function WeatherForecast() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <WeatherMap />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default WeatherForecast
