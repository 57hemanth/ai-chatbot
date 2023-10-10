import { useContext } from "react"
import { BiSolidUser } from "react-icons/bi"
import { RiRobot2Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContextProvider"

export default function HomePage() {

    const contextData = useContext(UserContext)

    return(
        <section className="max-h-screen mb-8">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-semibold text-center mt-12 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-800 text-transparent bg-clip-text pb-4">Best AI Chatbot for you needs</h1>
                    <p className="text-md md:text-xl text-center">Your gateway to intelligent converstations. Generate code, poems, songs, articles and many more</p>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-row items-center gap-2 px-8 py-4 border w-fit rounded bg-white">
                            <BiSolidUser className="w-8 h-8 border rounded-full p-2" />
                            <p>What is your name?</p>
                        </div>
                        <div className="flex flex-row items-center gap-2 px-8 py-4 border w-fit rounded bg-white">
                            <p>I'm a robot. I don't have a name</p>
                            <RiRobot2Line className="w-8 h-8 border rounded-full p-2" />
                        </div>
                    </div>
                    <Link to={`${contextData.user ? "/chats" : "/login"}`} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded">Get Started</Link>
            </div>
            <div className="text-center pt-4 flex flex-col gap-2">
                <p className="font-bold">Few example conversations</p>
                <div className="flex flex-row gap-2 flex-wrap justify-center">
                    <p className="bg-gray-300 w-fit py-2 px-1 rounded">🤗Write a poem for me</p>
                    <p className="bg-gray-300 w-fit py-2 px-1 rounded">👨‍💻Please write a JS code</p>
                    <p className="bg-gray-300 w-fit py-2 px-1 rounded">🕺How to dance in club</p>
                    <p className="bg-gray-300 w-fit py-2 px-1 rounded">🎁Best birthday gift for friend</p>
                    <p className="bg-gray-300 w-fit py-2 px-1 rounded">🤽Learn to swim in the water</p>
                </div>
            </div>
        </section>
    )
}