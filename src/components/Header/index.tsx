import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header(){

  async function handleLogout(){
    await signOut(auth);
  }

  return(
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
         <div className="flex gap-4 font-medium">
           <Link to="/" className="text-black hover:text-orange-400">
            Home
           </Link>
           <Link to="/admin" className="text-black hover:text-orange-400">
            Links
           </Link>
           <Link to="/admin/social" className="text-black hover:text-orange-400">
            Redes sociais
           </Link>
         </div>

         <button onClick={handleLogout}>
            <BiLogOut size={28} color="#fa9e00"/>
         </button>
      </nav>
    </header>
  )
}