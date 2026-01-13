import { WeatherDashboard } from "@/widgets/weather-dashboard/ui/WeatherDashboard";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">날씨 정보</h1>
        <WeatherDashboard />
      </div>
    </div>
  );
};
