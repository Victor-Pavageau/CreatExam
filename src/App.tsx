import { ConfigProvider } from "antd";
import "./App.css";
import RouteHandler from "./routings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#15CC2E",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouteHandler />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
