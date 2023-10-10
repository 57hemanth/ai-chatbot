import { useContext, useEffect, useRef, useState } from "react"
import { VscSend } from "react-icons/vsc"
import { BiSolidUser } from "react-icons/bi"
import { RiRobot2Line } from "react-icons/ri"
import { LoadingIcon } from "../assets"
import handleCodeBlock from "../healpers/handleCodeBlock"

export default function ChatsPage () {

    const [prompt, setPrompt] = useState("")
    const [chats, setChats] = useState([])
    const bottomRef = useRef()
    const URL = "http://localhost:5000/api/chats"
    let newChats = []
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end" });
    }, [chats])
    
    useEffect(() => {
        async function getChats(){
            const response = await fetch(URL, {
                method: "GET",
                credentials: "include"
            })
            const res = await response.json()
            if(response.ok){
                setChats(res.chats)
            }
        }
        getChats()
    }, [])

    async function handleChat(e) {
        e.preventDefault()
        const response = await fetch(`${URL}/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role: "user", content: prompt }),
            credentials: "include"
        })
        console.log(response)
        newChats = [...chats, { role: "user", content: prompt }]
        setChats(newChats)
        setPrompt("")
        generate()
    }

    async function generate() {
        try {
            setLoading(true)
            const response = await fetch(`${URL}/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newChats),
                credentials: "include"
            })
            const res = await response.json()
            setChats(chats => [...chats, res])
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteChat() {
        try {
            const response = await fetch(`${URL}/delete`, {
                method: "DELETE",
                credentials: "include"
            })
            const res = await response
            window.location.reload()
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <main className="max-w-5xl mx-auto pb-4 pt-4 flex flex-col gap-4">
            <div className="flex flex-row justify-between">
                <p className="font-bold text-xl">Chat</p>
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleDeleteChat}>Clear chat</button>
            </div>
            <div className="min-h-[calc(100vh-208px)] max-h-[calc(100vh-208px)] border border-gray-300 p-2 rounded-lg overflow-y-auto no-scrollbar scroll-smooth snap-end">
                {chats.map((chat, i) => {
                    if(chat.role == "user"){
                        return(
                            <div className="p-4 flex flex-row gap-2 items-center border-b-[1px] border-gray-200" key={i}>
                                <BiSolidUser className="w-8 h-8 border rounded-full p-2 shrink-0" />
                                <p>{chat.content}</p>
                            </div>
                        )
                    } else {
                        return(
                            <div className={`p-4 flex flex-row gap-2 items-center ${i < chats.length - 1 && "border-b-[1px]" } border-gray-200`} key={i}>
                                <RiRobot2Line className="w-8 h-8 border rounded-full p-2 shrink-0" />
                                <div className="flex flex-col gap-2">
                                    {handleCodeBlock(chat.content)}
                                </div>
                            </div>
                        )
                    }
                })}
                {loading && (
                    <div className="px-4 pb-3 flex flex-row gap-2 items-center border-gray-200">
                        <RiRobot2Line className="w-8 h-8 border rounded-full p-2 shrink-0" />
                        <img className="w-14" src={LoadingIcon}></img>
                    </div>
                )}
                <div className="mb-1"></div>
                <div ref={bottomRef}></div>
            </div>
            <form className="flex flex-row items-center border border-gray-500 px-2 py-2 rounded" onSubmit={handleChat}>
                <input className="w-full outline-none" type="text" placeholder="Send a message" value={prompt} onChange={(e) => setPrompt(e.target.value)}></input>
                <button type="submit"><VscSend /></button>
            </form>
        </main>
    )
}