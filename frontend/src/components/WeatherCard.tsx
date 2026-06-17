import type { WeatherData } from '../types/weather'

interface WeatherCardProps {
  weather: WeatherData
}

function formatLocation(weather: WeatherData) {
  const parts = [weather.city]
  if (weather.state) parts.push(weather.state)
  parts.push(weather.country)
  return parts.join(', ')
}

function formatUpdatedAt(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 text-left shadow-xl backdrop-blur">
      <p className="text-sm uppercase tracking-wide text-slate-400">Tempo atual</p>
      <h2 className="mt-1 text-2xl font-semibold text-white">
        {formatLocation(weather)}
      </h2>

      <div className="mt-6 flex items-center gap-4">
        <img
          src={iconUrl}
          alt={weather.description}
          className="h-20 w-20"
        />
        <div>
          <p className="text-5xl font-bold text-white">{weather.temp}°C</p>
          <p className="capitalize text-slate-300">{weather.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-950/70 p-4">
          <p className="text-xs uppercase text-slate-400">Sensação</p>
          <p className="mt-1 text-lg font-medium text-white">
            {weather.feelsLike}°C
          </p>
        </div>
        <div className="rounded-xl bg-slate-950/70 p-4">
          <p className="text-xs uppercase text-slate-400">Umidade</p>
          <p className="mt-1 text-lg font-medium text-white">
            {weather.humidity}%
          </p>
        </div>
        <div className="rounded-xl bg-slate-950/70 p-4">
          <p className="text-xs uppercase text-slate-400">Vento</p>
          <p className="mt-1 text-lg font-medium text-white">
            {weather.windSpeed} m/s
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Atualizado em {formatUpdatedAt(weather.updatedAt)}
      </p>
    </section>
  )
}
