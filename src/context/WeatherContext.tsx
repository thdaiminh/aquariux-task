import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import type { CurrentWeather, ForecastItem } from "@/types/weather.ts";
import type { HistoryItem } from "@/types/history.ts";

interface WeatherContextType {
  currentWeather: CurrentWeather | null;
  forecast: ForecastItem[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchHistory: HistoryItem[];
  addToHistory: (city: HistoryItem) => void;
  removeFromHistory: (city: HistoryItem) => void;
  fetchWeather: (city: string) => Promise<CurrentWeather | null | undefined>;
  error: string | null;
  setError: (err: string | null) => void;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType>(
  {} as WeatherContextType,
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    // Try to load from storage, else use default
    const saved = localStorage.getItem("selectedCity");
    return saved ? JSON.parse(saved) : "Singapore";
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  }, [selectedCity]);

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const transformCurrentWeather = (data: any): CurrentWeather => ({
    city: data.name,
    cityCode: data.sys.country,
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    visibility: data.visibility,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  });

  const transformForecastData = (list: any[]): ForecastItem[] =>
    list.map((item) => ({
      dt: item.dt,
      minTemp: item.main.temp_min,
      maxTemp: item.main.temp_max,
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  const fetchWeather = async (city: string) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setError(null);
      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`,
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`,
        ),
      ]);

      if (!currentRes.ok || !forecastRes.ok)
        throw new Error("Invalid country or city");

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      setCurrentWeather(transformCurrentWeather(currentData));
      setForecast(transformForecastData(forecastData.list));
      setError(null);
      setIsLoading(false);
      return transformCurrentWeather(currentData);
    } catch (err) {
      setError("Invalid country or city");
      setIsLoading(false);
      return null;
    }
  };

  const addToHistory = (item: HistoryItem) => {
    const updatedHistory = [
      item,
      ...searchHistory.filter((searchItem) => !(searchItem.city === item.city)),
    ].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify(updatedHistory),
    );
  };

  const removeFromHistory = (item: HistoryItem) => {
    const updatedHistory = searchHistory.filter(
      (searchHistory) =>
        !(
          searchHistory.city === item.city &&
          searchHistory.cityCode === item.cityCode
        ),
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify(updatedHistory),
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        selectedCity,
        setSelectedCity,
        searchHistory,
        addToHistory,
        removeFromHistory,
        fetchWeather,
        error,
        setError,
        isLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
