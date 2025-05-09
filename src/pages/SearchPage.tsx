import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import SearchHistory from "@/components/ui/SearchHistory.tsx";
import { useNavigate } from "react-router-dom";
import type { HistoryItem } from "@/types/history.ts";

const SearchPage = () => {
  const {
    setSelectedCity,
    searchHistory,
    addToHistory,
    removeFromHistory,
    error,
    setError,
    fetchWeather,
  } = useWeather();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setError(null);
    const response = await fetchWeather(searchTerm.trim());
    if (response) {
      setSelectedCity(response.city);
      addToHistory({
        city: response.city,
        cityCode: response.cityCode,
      });
      navigate("/");
    }
  };

  const handleSelectHistory = async (city: HistoryItem) => {
    const response = await fetchWeather(city.city);
    if (response) {
      setSelectedCity(city.city);
      addToHistory(city);
      navigate("/");
    }
  };

  return (
    <div className="w-full py-0 sm:py-4">
      <form className="flex gap-2" onSubmit={handleSearch}>
        <input
          className="flex-1 bg-white rounded-md p-2 px-3 border-neutral-300 border-1 min-h-[24px]"
          type="text"
          placeholder="Search country or city here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors rounded-md p-2 px-3 text-white font-semibold text-sm"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-1">{error}</p>}

      <SearchHistory
        history={searchHistory}
        onSelect={handleSelectHistory}
        onDelete={removeFromHistory}
      />
    </div>
  );
};

export default SearchPage;
