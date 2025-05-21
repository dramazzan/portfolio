import Link from "next/link"
import ToggleTheme from "@/components/ToggleTheme"

const Navigation = () => {
  return (
    <div className="flex w-screen items-center justify-center">
         <nav className="flex items-center w-[1200px] p-[10px] justify-between bg-gray-300 ">
        <h1>Portfolio</h1>
        <ul>
           <li>
                <Link href="">Home</Link>
            </li> 
        </ul>
        <ToggleTheme/>
    </nav>
    </div>
   
  )
}

export default Navigation