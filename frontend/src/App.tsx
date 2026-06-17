import { useEffect } from 'react'
import { SearchForm } from './components/SearchForm'
import { WeatherCard } from './components/WeatherCard'
import { useWeather } from './hooks/useWeather'
import { getWeatherGradient } from './utils/weatherTheme'

function App() {
  const { weather, loading, error, fetchWeather } = useWeather()

  useEffect(() => {
    fetchWeather({ city: 'São Paulo', state: 'SP', country: 'BR' })
  }, [fetchWeather])

  const gradient = getWeatherGradient(weather?.icon)

  return (
    <main className="relative flex min-h-svh flex-col items-center px-4 py-10">
      <div
        key={weather?.icon ?? 'default'}
        className="weather-bg absolute inset-0 -z-10"
        style={{ background: gradient }}
      />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Previsão do Tempo
        </h1>
        <p className="mt-2 text-slate-300">
          Consulte o clima atual por cidade, estado e país
        </p>
      </div>

      <SearchForm loading={loading} onSearch={fetchWeather} />

      {error && (
        <p className="mt-6 w-full max-w-2xl rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-left text-red-200">
          {error}
        </p>
      )}

      {weather && !error && (
        <div className="mt-6 w-full flex justify-center">
          <WeatherCard weather={weather} />
        </div>
      )}
    </main>
  )
}

export default App
