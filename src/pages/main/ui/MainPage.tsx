import { Container } from "@/shared/ui/Container";
import { WeatherDashboard } from "@/widgets/weather-dashboard/ui/WeatherDashboard";

export const MainPage = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">날씨 정보</h1>
      <WeatherDashboard />
    </Container>
  );
};
