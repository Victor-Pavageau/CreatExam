import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
    </Routes>
  );
}

export default RouteHandler;