import { MainPage } from "@/pages/main/ui/MainPage";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <MainPage />
    </QueryProvider>
  );
}

export default App;
