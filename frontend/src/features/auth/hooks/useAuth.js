import { useContext, useEffect } from "react";
import { authContext } from "../auth.context";
import { login, register, logOut, getMe } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(authContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }



    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true)
        try {

            const data = await register({ userName, email, password })
            setUser(data.user)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }



    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logOut()
            setUser(null)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            } {

            }
        }
    })

    return { user, loading, handleLogin, handleLogout, handleRegister }
}

