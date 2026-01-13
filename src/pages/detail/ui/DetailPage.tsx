import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/shared/ui/Container";

export const DetailPage = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();

  return (
    <Container>
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-3xl font-bold mb-6">
        {decodeURIComponent(location || "")} 날씨 상세
      </h1>

      {/* 여기에 WeatherCard 들어갈 예정 */}
      <p>상세 페이지 구현 중...</p>
    </Container>
  );
};
