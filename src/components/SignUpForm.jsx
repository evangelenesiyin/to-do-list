import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import GoogleLoginComponent from "./GoogleLogin";
import { signUpService } from "../utils/users-service";
import { showToast } from './Toast';

export default function SignUpForm({ toggleForm, setUser, status, setStatus }) {
    const [userData, setUserData] = useState({
    username: "",
    password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
        setUserData({
        ...userData,
        [name]: value,
        });
    } else {
        setUserData({
        ...userData,
        [name]: value,
        });
    }
    };

     const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await signUpService(userData);
        if (user !== null && user !== undefined) {
            setUser(user);
            navigate("/home");
        }
    } catch (err) {
        setStatus("error");
        showToast("error", "Unable to create an account. Please try again.")
    } finally {
        setStatus(null);
    }
  }

    return (
        <div className="landing-page">
            <div>
            <img className="landing-image" src="src/assets/signup-landing.jpg" />
            </div>
            <div className="form-section">
            <h1>Let's get started!</h1>
            Sign up below to create an account.

            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                <FormControl required >
                    <Input 
                    name="username"
                    value={userData.username}
                    placeholder="Username" 
                    onChange={handleChange}
                    autoComplete="off"
                    style={{ width: 320 }} 
                    />
                </FormControl>

                {(userData.username !== "" && userData.username.length < 6) && (<div className="form-validation-message">Username must be at least 6 characters.</div>)}

                <FormControl required>
                    <Input 
                    type="password" 
                    name="password"
                    value={userData.password}
                    placeholder="Password" 
                    onChange={handleChange}
                    autoComplete="off"
                    style={{ width: 320, marginTop: 20 }} 
                    />
                </FormControl>

                {(userData.password !== "" && userData.password.length < 6) && (
                <div className="form-validation-message">Password must be at least 6 characters</div> )}

                <Button 
                variant="contained" 
                type="submit"
                style={{ backgroundColor: "#E09B9C", color: "#333333", marginTop: 30 }}
                >Sign Up
                </Button>
                </form>
            </div>

            <p style={{ fontSize: 13, marginTop: 30 }}>
            Already have an account? <button
                className="landing-button"
                onClick={toggleForm}
                >
                    Log in here
                </button>.
            </p>
            </div>
        </div>
    );
}