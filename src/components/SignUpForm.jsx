import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function SignUpForm({ toggleForm }) {
    const [userData, setUserData] = useState({
    email: "",
    password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
        const isEmailValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value);
        setUserData({
        ...userData,
        [name]: value,
        valid: isEmailValid && isFormValid(),
        });
    } else {
        setUserData({
        ...userData,
        [name]: value,
        valid: isFormValid(),
        });
    }
    };

    const isFormValid = () => {
    return (
        userData.email &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userData.email) &&
        userData.password
    );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/todo");
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
                    name="email"
                    value={userData.email}
                    placeholder="Email" 
                    onChange={handleChange}
                    autoComplete="off"
                    style={{ width: 320 }} 
                    />
                </FormControl>

                {(userData.email !== "" && !userData.email.includes("@")) && (<div className="form-validation-message">example@yourdomain.com</div>)}

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