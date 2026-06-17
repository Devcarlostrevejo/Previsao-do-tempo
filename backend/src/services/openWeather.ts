import axios from "axios";
import type { OpenWeatherResponse, WeatherData } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

function buildLocationQuery(city: string, state?: string, country?: string): string {
  const parts = [city.trim()];
  if (state?.trim()) parts.push(state.trim());
  if (country?.trim()) parts.push(country.trim());
  return parts.join(",");
}

function normalizeWeather(
  data: OpenWeatherResponse,
  state?: string
): WeatherData {
  const weather = data.weather[0];

  return {
    city: data.name,
    state: state?.trim() || undefined,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: weather.description,
    icon: weather.icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    updatedAt: new Date().toISOString(),
  };
}

export async function getWeather(
  city: string,
  state?: string,
  country?: string
): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error("OPEN_WEATHER_API_KEY não definida no .env");
  }

  const q = buildLocationQuery(city, state, country);

  const { data } = await axios.get<OpenWeatherResponse>(`${BASE_URL}/weather`, {
    params: {
      q,
      appid: API_KEY,
      units: "metric",
      lang: "pt_br",
    },
  });

  return normalizeWeather(data, state);
}
