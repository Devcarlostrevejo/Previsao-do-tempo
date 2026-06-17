export interface WeatherData {
  city: string
  state?: string
  country: string
  temp: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  updatedAt: string
}

export interface LocationQuery {
  city: string
  state: string
  country: string
}
