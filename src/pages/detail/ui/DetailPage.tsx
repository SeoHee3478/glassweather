import { useSearchParams, useNavigate } from "react-router-dom";
import { Container } from "@/shared/ui/Container";
import { WeatherDetail } from "@/widgets/weather-detail/ui/WeatherDetail";

export const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const location = searchParams.get("location");
  console.log(lat, lon, location);
  return (
    <Container>
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← 뒤로가기
      </button>

      <WeatherDetail lat={lat} lon={lon} location={location} />
    </Container>
  );
};
