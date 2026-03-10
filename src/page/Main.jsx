import React from 'react'
import Header from '../components/components/Header'
import BestTour from '../components/MainPage/BestTour'
import Banner from '../components/MainPage/Banner/Banner'
import AboutUs from '../components/MainPage/aboutUs/AboutUs'
import Testimonials from '../components/MainPage/testimoials/Testimonials'
import QuestionsAnswer from '../components/MainPage/questions/QuestionsAnswer'
import Booking from '../components/components/booking/Booking'
import Footer from '../components/components/footer/Footer'
const Main = () => {
  return <>
  <Header isVisibility={false}></Header>
  <Banner/>
  <AboutUs/>
  <BestTour/>
  <Testimonials/>
  <BestTour text="Winter tours" season='winter'/>
  <QuestionsAnswer/>
  <Booking/>
  <Footer/>
  </>
}

export default Main
