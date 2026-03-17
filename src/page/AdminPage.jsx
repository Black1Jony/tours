import { useEffect } from "react"
import { useNavigate } from "react-router"
import api from "../api/api"
import Header from "../components/components/Header"
import Admin from "../components/components/admin/createTour/Admin"
const AdminPage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const checckAdmin = async ()=>{
        try {
            const key = localStorage.getItem('secretKey')
            if (!key) {
                navigate('/')
                return
            }
            const response = await api.get(`/isAdmin?secretKey=${key}`)
    
            if (!response.data.isAdmin) {
                navigate('/')
            }
        } catch (error) {
            navigate('/')
        }
    }
    checckAdmin()
  }, [])
    return <>
    <Header />
    <Admin/>
    </>
}

export default AdminPage