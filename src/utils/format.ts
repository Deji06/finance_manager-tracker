export const formatCurrency = (amount: number, currency = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}


 export const dateFormatter = (
  dateInput: string | Date,
  locale: string = "en-NG"
): string => {
  const date = typeof dateInput === "string"
    ? new Date(dateInput)
    : dateInput

  if (isNaN(date.getTime())) return ""

  const getOrdinal = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`
    switch (day % 10) {
      case 1: return `${day}st`
      case 2: return `${day}nd`
      case 3: return `${day}rd`
      default: return `${day}th`
    }
  }

  const time = date
    .toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()

  const month = date.toLocaleString(locale, { month: "short" })
  const day = getOrdinal(date.getDate())
  const year = date.getFullYear()

  return `${time} · ${month} ${day} ${year}`
}