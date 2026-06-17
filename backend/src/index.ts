import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { getWeather } from "./services/openWeather";

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/api/geocode", async (req, res) => {
  const q = req.query.q as string | undefined;
  if (!q?.trim() || q.trim().length < 2) {
    return res.json([]);
  }

  if (!process.env.OPEN_WEATHER_API_KEY) {
    return res.json([]);
  }

  try {
    const { data } = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
      params: { q: q.trim(), limit: 5, appid: process.env.OPEN_WEATHER_API_KEY },
    });

    const seen = new Set<string>();
    const suggestions = (data as Array<{ name: string; state?: string; country: string }>)
      .map((item) => ({ name: item.name, state: item.state ?? "", country: item.country }))
      .filter(({ name, country }) => {
        const key = `${name.toLowerCase()}|${country.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    res.json(suggestions);
  } catch {
    res.json([]);
  }
});

app.get("/api/weather", async (req, res) => {
  const city = req.query.city as string | undefined;
  const state = req.query.state as string | undefined;
  const country = req.query.country as string | undefined;

  if (!city?.trim()) {
    return res.status(400).json({ error: "Informe a cidade." });
  }

  if (!country?.trim()) {
    return res.status(400).json({ error: "Informe o país (ex: BR, US)." });
  }

  try {
    const data = await getWeather(city, state, country);
    res.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        return res.status(404).json({
          error: "Local não encontrado. Verifique cidade, estado e país.",
        });
      }

      if (status === 401) {
        return res.status(500).json({ error: "Chave da API inválida." });
      }
    }

    res.status(500).json({ error: "Falha ao buscar previsão do tempo." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
