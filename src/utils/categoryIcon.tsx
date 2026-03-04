import {
  FaUtensils,
  FaFilm,
  FaHome,
  FaPiggyBank,
  FaBolt,
  FaWallet,
} from "react-icons/fa"
import { IoCarSport } from "react-icons/io5";


export const getCategoryIcon = (category: string) => {
  const baseClass = "text-lg text-gray-600"

  switch (category) {
    case "FOOD":
      return <FaUtensils className={baseClass} size={12}/>
    case "TRANSPORT":
      return <IoCarSport className={baseClass} size={12} />
    case "ENTERTAINMENT":
      return <FaFilm className={baseClass} size={12} />
    case "RENT":
      return <FaHome className={baseClass} size={12} />
    case "SAVINGS":
      return <FaPiggyBank className={baseClass} size={12} />
    case "UTILITIES":
      return <FaBolt className={baseClass}  size={12}/>
    default:
      return <FaWallet className={baseClass} size={12}/>
  }
}