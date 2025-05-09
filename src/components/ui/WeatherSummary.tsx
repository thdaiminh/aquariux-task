import { useWeather } from "@/context/WeatherContext.tsx";
import { IconArrow } from "@/components/icons/IconArrow.tsx";

const WeatherSummary = () => {
  const { currentWeather } = useWeather();

  if (!currentWeather) return null;

  return (
    <div className="bg-white rounded-xl p-4 border-neutral-300 border-1 shadow-md">
      <div className="header">
        <div className="text-lg text-neutral-600 font-semibold">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <img
          className="h-full"
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt="Weather icon"
        />
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-bold">
            {Math.round(currentWeather.temp)}°C
          </p>
          <p className="text-lg font-semibold capitalize">
            {currentWeather.description}
          </p>
        </div>
      </div>
      <div className="flex gap-1 justify-around items-center mt-2">
        <div className="flex flex-col gap-1 text-center">
          <span className="text-sm text-neutral-500">Humidity</span>
          <span className="text-lg font-semibold">
            {currentWeather.humidity}%
          </span>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <span className="text-sm text-neutral-500">Wind</span>
          <div className="flex gap-1 items-center">
            <IconArrow
              width={16}
              height={16}
              style={{
                transform: `rotate(${currentWeather.windDirection}deg)`,
                transition: "transform 0.3s",
              }}
            />
            <span className="text-lg font-semibold">
              {currentWeather.windSpeed} <span className="text-sm">m/s</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <span className="text-sm text-neutral-500">Visibility</span>
          <div className="text-lg font-semibold">
            {currentWeather.visibility / 1000}{" "}
            <span className="text-sm">km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
