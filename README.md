# Aquariux Technical Test

A modern weather dashboard widget built with React and TypeScript, powered by the OpenWeather API.

---

## 🚀 Get Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [npm](https://www.npmjs.com/) v9 or higher

---

### Setup Instructions

1. **Clone the repository**
 ```
git clone https://github.com/yourusername/your-repo.git
cd your-repo
 ```

2. **Copy the environment variables file and install dependencies**
 ```
cp .env.example .env
npm install
 ```

3. **Add your OpenWeather API key**

- Open `.env` in your project root.
- Paste your OpenWeather API key for `VITE_OPENWEATHER_API_KEY`:

  ```
  VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
  ```

---

### Run the App in Development Mode

npm run dev


- Open [http://localhost:8080](http://localhost:8080) to view the app in your browser.

---

## 📝 Project Features

This project fulfills the following requirements:

- **Current Weather Summary**
    - Displays the current date, weather icon, temperature, and description.
    - Shows humidity, wind speed (with arrow direction), and visibility.

- **5-Day Forecast (3-Hour Intervals)**
    - Forecast data is grouped by day (today and subsequent days).
    - Each entry includes time (24h), weather icon, max/min temperature, and description.

- **Search & History**
    - Search by city or country.
    - Search history is stored in the browser and can be managed (select or delete).
    - Clicking a history item updates the weather details.
    - Invalid searches display an error message.

- **UI/UX**
    - Responsive design for desktop and mobile.
    - Weather icons from OpenWeather.
    - Wind direction arrow styled per OpenWeather's approach.
    - Accessible and user-friendly interface.

- **Code Quality**
    - Modular, scalable, and readable code structure.
    - Secure API key handling via environment variables.
    - Error handling for all API calls.
    - Local storage encryption for search history (if implemented).

---

## 📦 Available Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the app for production.
- `npm run preview` - Preview the production build locally.

---
