import styled from 'styled-components'
export const Wrap = styled.div`
   width: 100%;
   overflow: hidden;
`
export const Main = styled.main`
   width: ${(props) => props.$width || '1200px'};
   margin: 0 auto;
   overflow: hidden;
   padding: ${(props) => props.$padding || '100px'};
`
export const Input = styled.input`
   width: 100%;
   outline: none;
   border-radius: 10px;
   height: ${(props) => props.$height || '15px'};
   font-size: ${(props) => props.$fontSize || '1rem'};
`
export const Button = styled.button`
   color: white;
   border: none;
   padding: 10px 20px;
   font-weight: 600;
   font-size: 1rem;
   border-radius: 10px;
   cursor: pointer;
   background-color: ${(props) => props.$backgroundColor || '#3B82F6'};
   width: ${(props) => props.$width || '100%'};
   &:hover {
      background-color: #2563eb;
   }
`
export const Loading = styled.div`
   width: 100%;
   height: 400px;
   background-image: url(/images/loading.gif);
   background-repeat: no-repeat;
   background-position: center;
   background-size: 50px auto;
`
export const MarginDiv = styled.div`
   margin-top: ${(props) => props.$marginTop || '40px'};
   margin-bottom: ${(props) => props.$marginBottom || '40px'};
`
/* ForecastSlider */
export const Section = styled.div`
   margin-bottom: 48px;
   padding: 24px;
   border-radius: 16px;
   background-color: ${(props) => props.$bg || '#fff'};
   color: ${(props) => (props.$dark ? '#fff' : '#212121')};
   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
   transition: background-color 0.3s ease;
`
export const Title = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   padding: 100px;
`
export const DateTitle = styled.h3`
   font-size: 1.1rem;
   font-weight: bold;
   margin-bottom: 16px;
   border-bottom: 2px solid rgba(255, 255, 255, 0.3);
   padding-bottom: 8px;
`
export const WeatherCard = styled.div`
   height: 280px;
   background-color: #ffffff;
   border-radius: 12px;
   text-align: center;
   padding: 16px;
   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;
   &:hover {
      transform: translateY(-6px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
   }
`
export const DetailText = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 6px;
   font-size: 0.8rem;
   margin-top: 4px;
   color: #444;
`
/* Home */

export const SearchForm = styled.form`
   margin-top: 24px;
   display: flex;
   justify-content: center;
   gap: 8px;
`
// map

export const Panel = styled.div`
   width: 320px;
   padding: 24px;
   background-color: #e3f2fd;
   display: flex;
   flex-direction: column;
   gap: 16px;
   box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`
export const InfoCard = styled.div`
   background-color: white;
   padding: 16px;
   border-radius: 10px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   display: flex;
   flex-direction: column;
   gap: 6px;
`
