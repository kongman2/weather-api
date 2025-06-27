import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import HomeSlider from '../components/slider/HomeSlider'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Banner />
         <Main>
            <HomeSlider />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home
