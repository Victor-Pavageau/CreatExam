import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateExam from "./pages/CreateExam";
import TestUI from "./pages/TestUI";

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/create-exam"} element={<CreateExam />} />
      <Route path={"/ui"} element={<TestUI />} />
    </Routes>
  );
}

export default RouteHandler;