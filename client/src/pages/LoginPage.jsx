import { useContext, useState } from "react"
import { UserContext } from "../context/UserContextProvider"

export default function LoginPage() {

    const contextData = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    return(
        <section className="max-w-xl mx-auto mt-14">
            <h2 className="text-3xl text-center mb-8">Login</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => contextData.handleLogin(e, formData)}>
                <input className="p-2 border-2 border-gray-500 rounded" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData(data => { return {...data, [e.target.name]: e.target.value }})} ></input>
                <input className="p-2 border-2 border-gray-500 rounded" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData(data => { return {...data, [e.target.name]: e.target.value }})} ></input>
                <button className="bg-black text-white p-2 rounded">Submit</button>
            </form>
        </section>
    )
}