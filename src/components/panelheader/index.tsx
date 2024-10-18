import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../../services/firebaseConnection"

export function DashboardHeader(){

    async function handleLogOut() {
        await signOut(auth)
    }

    return(
        <div className="w-full items-center flex h-10 bg-red-600 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            <Link to="/dashboard">
                Dashboard
            </Link>
            <Link to="/dashboard/new">
                Novo carro
            </Link>

            <button onClick={handleLogOut} className="ml-auto ">
                Fazer LogOff
            </button>
        </div>
    )
}