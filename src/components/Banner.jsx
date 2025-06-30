import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Input } from '../styles/StyledComponent'
import './css/Banner.css'
function Banner() {
   const [city, setCity] = useState('')
   const navigate = useNavigate()
   const handleInputChange = (e) => setCity(e.target.value)
   const handleSearch = (e) => {
      e.preventDefault()
      const trimmed = city.trim()
      if (!trimmed) {
         alert('도시 이름을 입력해주세요!')
         return
      }
      navigate(`/map/${encodeURIComponent(trimmed)}`)
   }
   return (
      <div className="banner">
         <video autoPlay muted loop playsInline className="video-bg">
            <source src="/images/clouds-and-blue-sky-background.mp4" type="video/mp4" />
         </video>
         <div className="search">
            <NavLink to="/">
               <img src="/images/logotext.png" alt="로고" width="200" />
            </NavLink>
            <form className="search_form" onSubmit={handleSearch}>
               <Input $height="40px" $fontSize="1.1rem" value={city} onChange={handleInputChange} type="text" placeholder="도시를 입력하세요" />
               <Button $width="100px" type="submit">
                  검색
               </Button>
            </form>
         </div>
      </div>
   )
}
export default Banner
