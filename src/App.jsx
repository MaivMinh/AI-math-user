import "./App.css";
import MainLayout from "./components/MainLayout.jsx";
import { AppContextProvider } from "../src/context/AppContext.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Study from "./pages/Study.jsx";
import Practice from "./pages/Practice.jsx";
import Forum from "./pages/Forum.jsx";
import MathGame from "./pages/MathGame.jsx";
import BattleField from "./pages/BattleField.jsx";
import Lesson from "./pages/Lesson.jsx";
import Slide from "./components/Slide.jsx";
import Video from "./components/Video.jsx";
import Quiz from "./components/Quiz.jsx";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bai-hoc/:chapterName" element={<Study />} />
            <Route
              path="/bai-hoc/:chapterName/:lessonId/:artifact"
              element={<Lesson />}
            />
            <Route path="/kiem-tra-them" element={<Practice />} />
            <Route path="/dien-dan" element={<Forum />} />
            <Route path="/tro-choi-toan-hoc" element={<MathGame />} />
            <Route path="/dau-truong" element={<BattleField />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
