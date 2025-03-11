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
import Lesson from "./pages/Lesson.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bai-hoc/" element={<Study />} />
            <Route
              path="/bai-hoc/:chapterName/:lessonName/:artifact"
              element={<Lesson />}
            />
            <Route path="/kiem-tra-them" element={<Practice />} />
            <Route path="/dien-dan" element={<Forum />} />
            <Route path="/tro-choi-toan-hoc" element={<MathGame />} />
            <Route path="/dau-truong" element={<BattleField />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
