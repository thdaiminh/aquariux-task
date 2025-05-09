import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "@/context/WeatherContext";
import HomePage from "@/pages/HomePage.tsx";
import SearchPage from "@/pages/SearchPage";
import { RootLayout } from "@/components/layouts/RootLayout.tsx";

function App() {
  return (
    <WeatherProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </RootLayout>
      </Router>
    </WeatherProvider>
  );
}

export default App;
