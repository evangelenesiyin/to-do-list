import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TodoPage from "./pages/TodoPage";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  )
}

export default App;
