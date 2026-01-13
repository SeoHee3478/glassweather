import { MainPage } from "@/pages/main/ui/MainPage";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { Route, Routes } from "react-router-dom";
import { DetailPage } from "@/pages/detail/ui/DetailPage";

function App() {
  return (
    <RouterProvider>
      <QueryProvider>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/detail/:location" element={<DetailPage />}></Route>
        </Routes>
      </QueryProvider>
    </RouterProvider>
  );
}

export default App;
