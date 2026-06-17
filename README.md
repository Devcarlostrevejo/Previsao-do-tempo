# Previsão do Tempo

Aplicação fullstack de previsão do tempo com busca por cidade, usando React + TypeScript no frontend e Node.js + Express no backend, integrada à API da OpenWeatherMap.

## Tecnologias

| Camada    | Stack                                      |
|-----------|--------------------------------------------|
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS   |
| Backend   | Node.js, Express 5, TypeScript, ts-node-dev |
| API       | OpenWeatherMap (Geocoding + Current Weather)|

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Chave de API gratuita da [OpenWeatherMap](https://openweathermap.org/api)

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Devcarlostrevejo/Previsao-do-tempo.git
cd Previsao-do-tempo
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite o `.env` com sua chave da API:

```env
OPEN_WEATHER_API_KEY=sua_chave_aqui
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### 3. Configure o frontend

```bash
cd ../frontend
npm install
```

## Uso

Abra dois terminais e execute cada um separadamente:

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Endpoints da API

| Método | Rota            | Descrição                              |
|--------|-----------------|----------------------------------------|
| GET    | `/api/geocode`  | Autocomplete de cidades (`?q=nome`)    |
| GET    | `/api/weather`  | Previsão do tempo (`?city=&country=&state=`) |

## Estrutura do Projeto

```
Previsao-do-Tempo/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Entrada do servidor
│   │   ├── routes/
│   │   │   └── weather.ts
│   │   ├── services/
│   │   │   └── openWeather.ts
│   │   └── types/
│   │       └── weather.ts
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    └── package.json
```

## Licença

MIT
