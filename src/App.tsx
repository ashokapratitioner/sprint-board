import "./App.css";
import RouterProviderExtended from "./router/RouteProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProviderExtended />
    </QueryClientProvider>
  );
}

export default App;
