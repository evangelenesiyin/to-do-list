import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LandingPage() {
    const [isSignUp, setIsSignUp] = useState(true);

    return (
        <>
        {isSignUp ? <LoginForm toggleForm={() => setIsSignUp(!isSignUp)} /> : <SignUpForm toggleForm={() => setIsSignUp(!isSignUp)} /> }
        </>
    )
}