import { Link } from "react-router-dom";
import { Logo } from "../assets";
import NavigationLink from "./NavigationLink";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

export default function NavBar() {

    const data = useContext(UserContext)
    const chatPage = window.location.href != `${window.location.origin}/chats`

    return(
        <header className="max-w-7xl flex flex-row justify-between items-center h-16 flex-wrap">
            <Link to={"/"} className="flex flex-row items-center gap-1">
                <img src={Logo} className="w-[36px]"></img>
                <p className="font-bold text-xl">Chatbot</p>
            </Link>
            <nav className="flex flex-row gap-2">
                {data.user ? 
                <>
                    { chatPage && <NavigationLink to="/chats" name="Chat" background="white" color="black" />}
                    <button onClick={data.handleLogout} className="bg-black text-white px-2 py-1 rounded border">Logout</button>
                </> : 
                <>
                    <NavigationLink to="/signup" name="Signup" background="white" color="black" />
                    <NavigationLink to="/login" name="Login" background="black" color="white" />
                </> }
            </nav>
        </header>
    )
}