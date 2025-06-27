import { Button } from '@mui/material'
import './css/Menu.css'
import { NavLink } from 'react-router-dom'

function Menu() {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <NavLink to="/">
                     <img src="/images/logo.png" alt="로고" width="160"></img>
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/weather/:city">현재날씨</NavLink>
               </li>
               <li>
                  <NavLink to="/forecast/:city">지역별날씨</NavLink>
               </li>
               <li style={{ marginLeft: 'auto' }}>
                  <Button variant="outlined" href="#outlined-buttons">
                     날씨공유하기
                  </Button>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
