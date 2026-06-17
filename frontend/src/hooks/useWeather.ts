import { useCallback, useState } from 'react'
import type { LocationQuery, WeatherData } from '../types/weather'

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async (location: LocationQuery) => {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({
      city: location.city,
      country: location.country,
    })

    if (location.state.trim()) {
      params.set('state', location.state)
    }

    try {
      const response = await fetch(`/api/weather?${params.toString()}`)

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Não foi possível buscar o tempo.')
      }

      const data: WeatherData = await response.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)

      if (err instanceof TypeError) {
        setError(
          'Não foi possível conectar ao backend. Rode "npm run dev" na pasta backend.',
        )
        return
      }

      setError(err instanceof Error ? err.message : 'Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, loading, error, fetchWeather }
}
