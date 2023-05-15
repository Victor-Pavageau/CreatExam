import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateExam from "./pages/CreateExam";
import Auth from "./pages/Auth";

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/create-exam"} element={<CreateExam />} />
      <Route path={"/auth"} element={<Auth />} />
    </Routes>
  );
}

export default RouteHandler;