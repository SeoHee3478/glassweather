import { useParams, useNavigate } from "react-router-dom";

export const DetailPage = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};
