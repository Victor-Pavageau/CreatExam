import { ConfigProvider } from "antd";
import "./App.css";
import RouteHandler from "./routings";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#15CC2E",
        },
      }}
    >
      <RouteHandler />
    </ConfigProvider>
  );
}

export default App;
