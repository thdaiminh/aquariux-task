import { useWeather } from "@/context/WeatherContext.tsx";
import type { ForecastItem } from "@/types/weather.ts";

const ForecastList = () => {
  const { forecast } = useWeather();
  const groupedForecast = groupForecastByDate(forecast);

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex flex-col gap-5 mt-8">
      <h2 className="text-2xl font-semibold">5-day Forecast (3 Hours)</h2>
      <div className="flex gap-2 flex-col bg-white rounded-xl p-4 border-neutral-300 border-1">
        {Object.entries(groupedForecast).map(([date, items]) => (
          <div key={date} className="mb-6">
            <h3 className="text-neutral-500 font-semibold">
              {isToday(date)
                ? "Today"
                : new Date(date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })}
            </h3>
            <div className="mt-3">
              {items.map((item) => (
                <div key={item.dt} className="flex gap-2 items-center sm:gap-4">
                  <p className="text-neutral-700 font-semibold">
                    {new Date(item.dt * 1000).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex-1 flex items-center">
                    <img
                      className="max-w-14"
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt="Weather icon"
                    />
                    <p className="text-neutral-500 text-sm ">
                      {item.minTemp} / {item.maxTemp}°C
                    </p>
                  </div>

                  <p className="text-neutral-700 font-semibold">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const groupForecastByDate = (forecast: ForecastItem[]) => {
  return forecast.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, ForecastItem[]>,
  );
};

export default ForecastList;
