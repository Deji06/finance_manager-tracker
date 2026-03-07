import * as icons from "simple-icons"
// import { FaWifi } from "react-icons/fa"
import { SiAirtel, SiPlaystation, SiNetflix, SiSpotify, SiYoutube } from "react-icons/si"

type Props = {
  provider: string
}

const reactIconMap: Record<string, any> = {
  airtel: SiAirtel,
  playstation: SiPlaystation,
  netflix: SiNetflix,
  spotify: SiSpotify,
  youtube: SiYoutube,
}

const simpleIconMap: Record<string, keyof typeof icons> = {
  apple: "siApple",
  google: "siGoogle",
  // amazon: "siAmazon",
}

export default function ProviderIcon({ provider }: Props) {
  const normalized = provider.toLowerCase()

  const reactMatch = Object.keys(reactIconMap).find((key) =>
    normalized.includes(key)
  )

  const simpleMatch = Object.keys(simpleIconMap).find((key) =>
    normalized.includes(key)
  )

  if (reactMatch) {
    const Icon = reactIconMap[reactMatch]
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800">
        <Icon size={20} />
      </div>
    )
  }

  if (simpleMatch) {
    const icon = icons[simpleIconMap[simpleMatch]]

    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill={`#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 text-white font-semibold">
      {provider.charAt(0).toUpperCase()}
    </div>
  )
}