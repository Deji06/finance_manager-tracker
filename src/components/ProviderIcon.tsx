import  type { IconType } from "react-icons"
import {
  SiNetflix,
  SiSpotify,
  SiApple,
//   SiShowmax,
  SiPrime,
  SiYoutube,
//   SiMtn,
  SiAirtel,
//   SiOpay,
//   SiPalmpay,
//   SiKuda,
//   SiMoniepoint,
  SiPlaystation,
//   SiXbox,
} from "react-icons/si"
import { PiSpotifyLogo } from "react-icons/pi";
import { FcElectricity } from "react-icons/fc";

type Props = {
  provider: string
}

const providerIcons: Record<string, IconType> = {
  netflix: SiNetflix,
  spotify: PiSpotifyLogo,
  "apple music": SiApple,
  electricity: FcElectricity,
//   showmax: SiShowmax,
  "prime video": SiPrime,
  youtube: SiYoutube,
//   mtn: SiMtn,
  airtel: SiAirtel,
//   opay: SiOpay,
//   palmpay: SiPalmpay,
//   kuda: SiKuda,
//   moniepoint: SiMoniepoint,
  playstation: SiPlaystation,
//   xbox: SiXbox,
}

export default function ProviderIcon({ provider }: Props) {
  const key = provider.toLowerCase()
  const Icon = providerIcons[key]

  if (Icon) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-gray-300 dark:bg-gray-800">
        <Icon className="text-xl" size={20} />
      </div>
    )
  }

  // fallback — first letter avatar
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-gray-300 dark:bg-gray-800 text-white font-semibold">
      {provider.charAt(0).toUpperCase()}
    </div>
  )
}