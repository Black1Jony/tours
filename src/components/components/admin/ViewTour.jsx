import api from "../../../api/api"
import { useEffect, useState } from "react"
import Card from '../Card/Card'
const ViewTour = () => {
  const [tour, setTour] = useState([])
  useEffect(()=>{
    const getTours = async ()=>{
     try {
       const res = await api.post('/filter')  
       
      setTour(res.data?.items)
     } catch (error) {
      console.log(error);
     }
    }
    getTours()
  }, [])
  const key = localStorage.getItem('secretKey')
  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     
      {tour.map((item) => <Card key={item._id} tour={item} isAdminComponent={true} keyAdmin={key}/>)}
    </div>
  </>
}

export default ViewTour