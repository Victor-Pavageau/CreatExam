import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import GeneratePage from "./pages/GeneratePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyNoticePage from "./pages/PrivacyNoticePage";
import ProfilePage from "./pages/ProfilePage";
import SharedQuizzPage from "./pages/SharedQuizzPage";
import DashboardPage from "./pages/DashboardPage";
import WhoAreWePage from "./pages/WhoAreWePage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";

export type Path =
  | "/"
  | "/generate"
  | "/login"
  | "/register"
  | "/forgot-password"
  | "/terms-of-service"
  | "/privacy-notice"
  | "/profile"
  | "/quizz/:quizzId"
  | "/dashboard"
  | "/who-are-we"
  | "/pricing"
  | "/contact"
  | "/help"
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
      <Route path={tp("/generate")} element={<GeneratePage />} />
      <Route path={tp("/login")} element={<LoginPage />} />
      <Route path={tp("/register")} element={<RegisterPage />} />
      <Route path={tp("/forgot-password")} element={<ForgotPasswordPage />} />
      <Route path={tp("/terms-of-service")} element={<TermsOfServicePage />} />
      <Route path={tp("/privacy-notice")} element={<PrivacyNoticePage />} />
      <Route path={tp("/profile")} element={<ProfilePage />} />
      <Route path={tp("/quizz/:quizzId")} element={<SharedQuizzPage />} />
      <Route path={tp("/dashboard")} element={<DashboardPage />} />
      <Route path={tp("/who-are-we")} element={<WhoAreWePage />} />
      <Route path={tp("/pricing")} element={<PricingPage />} />
      <Route path={tp("/contact")} element={<ContactPage />} />
      <Route path={tp("/help")} element={<HelpPage />} />
      <Route path={tp("*")} element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteHandler;