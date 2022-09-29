import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"


export const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth()

    if (loading) return <h1>Cargandose</h1>

    if (!user) return <Navigate to={'/login'} />

    return <>{children}</>
}