import { MainPage } from "@/pages/main/ui/MainPage";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { Route, Routes } from "react-router-dom";
import { DetailPage } from "@/pages/detail/ui/DetailPage";
import { Toaster } from "sonner";

function App() {
  return (
    <RouterProvider>
      <QueryProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/detail" element={<DetailPage />}></Route>
        </Routes>
      </QueryProvider>
    </RouterProvider>
  );
}

export default App;
