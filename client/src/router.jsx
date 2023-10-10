import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./layout/mainLayout"
import { ChatsPage, HomePage, LoginPage, NotFound, SignupPage } from "./pages"

const router = createBrowserRouter([
    { path: "/", element: <MainLayout />, children: [
        { index: true, element: <HomePage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "chats", element: <ChatsPage /> },
        { path: "*", element: <NotFound /> }
    ] }
])

export default router