import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";
import { getUser } from "./utils/users-service";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Toast from './components/Toast';
import "./App.css";

function App() {
    const [user, setUser] = useState(getUser());
    const [status, setStatus] = useState(null);
    const [isSignUp, setIsSignUp] = useState(true);

     const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
        if (location.pathname === "/") {
        navigate("/home");
        }
    }
    }, [user, navigate, location]);

    return (
        <>
            {user ? (
                <>
                    <Header setUser={setUser} />
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/todo" element={<TodoPage />} />
                    </Routes>
                </>
            ) : (
                isSignUp ? (
                    <LoginForm toggleForm={() => setIsSignUp(!isSignUp)} setStatus={setStatus} setUser={setUser} user={user} />
                ) : (
                    <SignUpForm toggleForm={() => setIsSignUp(!isSignUp)} setUser={setUser} setStatus={setStatus} status={status} />
                )
            )}
            <Toast />
        </>
    );
}

export default App;
