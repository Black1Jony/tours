import Header from "../components/components/Header"
import BannerFilter from "../components/FilterPage/BannerFilter/BannerFilter"
import MainFilter from "../components/FilterPage/mainFilter/MainFilter"
const Tour = () => {
  return <>
  <Header isVisibility={false}/>
  <BannerFilter/>
  <MainFilter/>
  </>
}

export default Tour