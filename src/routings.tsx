import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateExam from "./pages/CreateExam";
import NotFoundPage from "./pages/NotFoundPage";

export type Path =
  | "/"
  | "/generate"
  | "*";

// eslint-disable-next-line react-refresh/only-export-components
export const tp = (path: Path, replace?: string[]): Path | string => {
  if (!replace) {
    return path;
  }
  return replacePlaceholders(path, replace);
};

const replacePlaceholders = (url: Path, replaceArray: string[]): string => {
  const expression = /:[\w-_]+/g;
  const array = url.match(expression) as string[];
  if (array.length !== replaceArray.length) {
    throw new Error(
      `Expected array of ${array.length} strings. Found ${replaceArray.length}`
    );
  }
  let result = url.toString();
  for (let i = 0; i < array.length; i++) {
    result = result.replace(array[i], replaceArray[i]);
  }
  return result;
};

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={tp("/")} element={<HomePage />} />
      <Route path={tp("/generate")} element={<CreateExam />} />
      <Route path={tp("*")} element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteHandler;