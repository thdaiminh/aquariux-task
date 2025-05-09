import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "@/context/WeatherContext.tsx";
import { IconPin } from "@/components/icons/IconPin.tsx";
import { IconSearch } from "@/components/icons/IconSearch.tsx";

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[600px] px-4 mx-auto">{children}</div>
);

const Header = () => {
  const navigate = useNavigate();
  const { currentWeather } = useWeather();
  return (
    <header className="bg-white shadow-lg w-full">
      <Container>
        <div className="py-3 flex items-center justify-between">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IconPin width={24} height={24} />
            <h1 className="text-xl font-bold">
              {currentWeather?.city}, {currentWeather?.cityCode}
            </h1>
          </div>
          <div
            className="cursor-pointer rounded-md hover:bg-blue-600  hover:text-white p-2 transition-colors"
            onClick={() => navigate("/search")}
          >
            <IconSearch width={20} height={20} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-5">
      <Header />
      <main className="flex flex-col gap-5 items-center justify-center">
        <Container>{children}</Container>
      </main>
    </div>
  );
};
