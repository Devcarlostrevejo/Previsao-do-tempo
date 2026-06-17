const GRADIENTS: Record<string, string> = {
  '01d': 'linear-gradient(to bottom, #38bdf8, #0ea5e9, #075985)',
  '01n': 'linear-gradient(to bottom, #020617, #0f0c29, #1e1b4b)',
  '02d': 'linear-gradient(to bottom, #93c5fd, #3b82f6, #1d4ed8)',
  '02n': 'linear-gradient(to bottom, #0f172a, #1e3a5f, #172554)',
  '03d': 'linear-gradient(to bottom, #94a3b8, #475569, #1e293b)',
  '03n': 'linear-gradient(to bottom, #1e293b, #334155, #0f172a)',
  '04d': 'linear-gradient(to bottom, #64748b, #334155, #0f172a)',
  '04n': 'linear-gradient(to bottom, #1e293b, #0f172a, #020617)',
  '09d': 'linear-gradient(to bottom, #1e40af, #1e3a5f, #0f172a)',
  '09n': 'linear-gradient(to bottom, #0f172a, #1e3a5f, #050d1a)',
  '10d': 'linear-gradient(to bottom, #1d4ed8, #1e3a5f, #0a1628)',
  '10n': 'linear-gradient(to bottom, #050d1a, #0f172a, #020617)',
  '11d': 'linear-gradient(to bottom, #1e1048, #0f0c29, #0a0614)',
  '11n': 'linear-gradient(to bottom, #0a0614, #0f0c29, #050308)',
  '13d': 'linear-gradient(to bottom, #bae6fd, #7dd3fc, #1d4ed8)',
  '13n': 'linear-gradient(to bottom, #0c1445, #1e293b, #0f172a)',
  '50d': 'linear-gradient(to bottom, #94a3b8, #64748b, #374151)',
  '50n': 'linear-gradient(to bottom, #374151, #1f2937, #111827)',
}

const DEFAULT = 'linear-gradient(to bottom, #020617, #0f172a, #020617)'

export function getWeatherGradient(icon?: string): string {
  if (!icon) return DEFAULT
  return GRADIENTS[icon] ?? GRADIENTS[icon.slice(0, 2) + 'd'] ?? DEFAULT
}
