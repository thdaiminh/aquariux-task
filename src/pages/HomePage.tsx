import { useWeather } from "@/context/WeatherContext";
import WeatherSummary from "@/components/ui/WeatherSummary.tsx";
import ForecastList from "@/components/ui/ForecastList.tsx";
import { IconSpinner } from "@/components/icons/IconSpinner.tsx";

const HomePage = () => {
  const { currentWeather, forecast, isLoading } = useWeather();

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] py-0 sm:py-4 justify-center items-center flex">
        <IconSpinner width={64} height={64} />
      </div>
    );
  }
  return (
    <div className="w-full py-0 sm:py-4">
      {currentWeather && <WeatherSummary />}
      {forecast.length > 0 && <ForecastList />}
    </div>
  );
};

export default HomePage;
