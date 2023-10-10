import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserContextProvider from "../context/UserContextProvider";

export default function MainLayout() {
    return(
        <div className="max-w-7xl mx-auto px-2">
            <UserContextProvider>
                <NavBar />
                <Outlet />
            </UserContextProvider>
        </div>
    )
}