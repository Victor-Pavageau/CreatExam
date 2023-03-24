import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateExam from "./pages/CreateExam";

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/create-exam"} element={<CreateExam />} />
    </Routes>
  );
}

export default RouteHandler;