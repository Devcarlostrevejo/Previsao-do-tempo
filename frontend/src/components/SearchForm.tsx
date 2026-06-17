import { useState, useRef, type FormEvent } from 'react'
import type { LocationQuery } from '../types/weather'
import { useGeocode, type GeoSuggestion } from '../hooks/useGeocode'

interface SearchFormProps {
  loading: boolean
  onSearch: (location: LocationQuery) => void
}

const COUNTRIES = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'PT', name: 'Portugal' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colômbia' },
  { code: 'MX', name: 'México' },
  { code: 'PE', name: 'Peru' },
  { code: 'UY', name: 'Uruguai' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'BO', name: 'Bolívia' },
  { code: 'PY', name: 'Paraguai' },
  { code: 'EC', name: 'Equador' },
  { code: 'DE', name: 'Alemanha' },
  { code: 'FR', name: 'França' },
  { code: 'ES', name: 'Espanha' },
  { code: 'IT', name: 'Itália' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'JP', name: 'Japão' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'Índia' },
  { code: 'AU', name: 'Austrália' },
  { code: 'CA', name: 'Canadá' },
  { code: 'RU', name: 'Rússia' },
  { code: 'ZA', name: 'África do Sul' },
  { code: 'NG', name: 'Nigéria' },
  { code: 'EG', name: 'Egito' },
  { code: 'KR', name: 'Coreia do Sul' },
  { code: 'TR', name: 'Turquia' },
  { code: 'SA', name: 'Arábia Saudita' },
]

export function SearchForm({ loading, onSearch }: SearchFormProps) {
  const [city, setCity] = useState('São Paulo')
  const [state, setState] = useState('SP')
  const [country, setCountry] = useState('BR')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { suggestions } = useGeocode(showSuggestions ? city : '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch({ city, state, country })
  }

  function selectSuggestion(suggestion: GeoSuggestion) {
    setCity(suggestion.name)
    setState(suggestion.state)
    setCountry(suggestion.country)
    setShowSuggestions(false)
  }

  function handleCityBlur() {
    closeTimer.current = setTimeout(() => setShowSuggestions(false), 150)
  }

  function handleSuggestionMouseDown() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-2xl gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="relative flex flex-col gap-2 text-left text-sm text-slate-300">
          Cidade
          <input
            type="text"
            value={city}
            onChange={(e) => { setCity(e.target.value); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleCityBlur}
            placeholder="Ex: Curitiba"
            required
            autoComplete="off"
            className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-sky-400"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              onMouseDown={handleSuggestionMouseDown}
              className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-slate-600 bg-slate-900 shadow-xl"
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => selectSuggestion(s)}
                  className="cursor-pointer px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
                >
                  {s.name}
                  {s.state && <span className="text-slate-400">, {s.state}</span>}
                  <span className="text-slate-400"> — {s.country}</span>
                </li>
              ))}
            </ul>
          )}
        </label>

        <label className="flex flex-col gap-2 text-left text-sm text-slate-300">
          Estado
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Ex: SP (opcional)"
            className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-sky-400"
          />
        </label>

        <label className="flex flex-col gap-2 text-left text-sm text-slate-300">
          País
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            placeholder="Ex: BR"
            required
            maxLength={2}
            list="country-list"
            className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 uppercase text-white outline-none focus:border-sky-400"
          />
          <datalist id="country-list">
            {COUNTRIES.map(({ code, name }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </datalist>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-sky-500 px-4 py-2.5 font-medium text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Buscando...' : 'Buscar tempo'}
      </button>
    </form>
  )
}
