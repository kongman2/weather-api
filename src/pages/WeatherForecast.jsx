import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import ForecastSlider from '../components/slider/ForecastSlider'

function WeatherForecast() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <ForecastSlider />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default WeatherForecast
