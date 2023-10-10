import { Link } from "react-router-dom"

export default function NavigationLink({ name, to, background, color }) {
    return(
        <Link to={to} className={`bg-${background} text-${color} px-2 py-1 rounded border border-black`}>{name}</Link>
    )
}