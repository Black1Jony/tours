import Header from "../components/components/Header"
import BannerFilter from "../components/FilterPage/BannerFilter/BannerFilter"
import FiltersBar from "../components/FilterPage/FiltersBar"
import MainFilter from "../components/FilterPage/mainFilter/MainFilter"
import Footer from "../components/components/footer/Footer"
const Tour = () => {
  return <>
  <Header isVisibility={false}/>
  <BannerFilter/>
  <FiltersBar/>
  <MainFilter/>
  <Footer/>
  </>
}

export default Tour