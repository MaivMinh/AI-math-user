import "./App.css";
import MainLayout from "./components/MainLayout.jsx";
import { AuthContextProvider } from "../src/context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Study from "./pages/Study.jsx";
import Practice from "./pages/Practice.jsx";
import Forum from "./pages/Forum.jsx";
import MathGame from "./pages/MathGame.jsx";
import BattleField from "./pages/BattleField.jsx";
import Profile from "./components/Profile.jsx";
import Lesson from "./pages/Lesson.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { TitleContextProvider } from "./context/TitleContext.jsx";
import Search from "./pages/Search.jsx";
import GoogleLogin from "./components/GoogleLogin.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TitleContextProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/forgot-password/"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />

            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/study/"
                element={
                  <PrivateRoute>
                    <Study />
                  </PrivateRoute>
                }
              />
              <Route
                path="/study/chapters/:chapterOrder/lessons/:lessonOrder/:artifact"
                element={
                  <PrivateRoute>
                    <Lesson />
                  </PrivateRoute>
                }
              />
              <Route
                path="/kiem-tra-them"
                element={
                  <PrivateRoute>
                    <Practice />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dien-dan"
                element={
                  <PrivateRoute>
                    <Forum />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tro-choi-toan-hoc"
                element={
                  <PrivateRoute>
                    <MathGame />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dau-truong"
                element={
                  <PrivateRoute>
                    <BattleField />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/account/login/google" element={<GoogleLogin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </TitleContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
