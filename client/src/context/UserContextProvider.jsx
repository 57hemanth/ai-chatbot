import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext(null)

export default function UserContextProvider({ children }){

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const URL = "http://localhost:5000/api/user"

    useEffect(() => {
        async function checkToken(){
            const response = await fetch(`${URL}/auth-token`, {
                method: "POST",
                credentials: "include"
            })
            const res = await response.json()
            if(response.ok){
                setUser(res)
            }
        }
        checkToken()
    }, [])

    async function handleLogin(e, data) {
        e.preventDefault()
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        const res = await response.json()
        if(response.ok){
            setUser(res.user)
            toast.success('Login successful', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            navigate("/")
        } else {
            toast.error('Login failed', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    async function handleSignup(e, data) {
        e.preventDefault()
        const response = await fetch(`${URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        if(response.ok){
            toast.success('Registration successful', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            navigate("/login")
        } else {
            toast.error('Registration failed', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    async function handleLogout(){
        const response = await fetch(`${URL}/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const res = await response.json()
        if(response.ok){
            window.location.href = "/"
        }
    }

    const contextData = {
        user, handleLogin, handleSignup, handleLogout
    }
    
    return(
        <UserContext.Provider value={contextData}>
            <ToastContainer />
            {children}
        </UserContext.Provider>
    )
}