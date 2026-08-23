import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logOut, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        const data = await login({ email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true)
        const data = await register({ userName, email, password })
        setUser(data.user)
        setLoading(false)
    }


    const handleLogout = async () => {
        setLoading(true)
        const data = await logOut()
        setUser(null)
        setLoading(false)
    }

    return {user,loading,handleLogin,handleLogout,handleRegister}
}

 