import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginService } from "../utils/users-service";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { showToast } from './Toast';

export default function LoginForm({ toggleForm, setStatus, user, setUser }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await loginService(credentials);
        if (user !== null && user !== undefined) {
            setUser(user);
            navigate("/home");
        }
    } catch (err) {
        setStatus("error");
        showToast("error", "Unsuccessful login attempt.")
    } finally {
        setStatus(null);
    }
  }

    return (
        <div className="landing-page">

            <div>
            <img className="landing-image" src="src/assets/landing-image.jpg" />
            </div>

            <div className="form-section">
            <h1>Welcome back!</h1>
            Log in to your account to access your to-do list.

            <div className="login-form">
                <form onSubmit={handleSubmit}>
                <FormControl required >
                    <Input 
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    autoComplete="off"
                    style={{ width: 320 }}
                    />
                </FormControl>

                <FormControl required>
                    <Input 
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    autoComplete="off"
                    style={{ width: 320, marginTop: 20 }}
                    />
                </FormControl>

                <Button 
                variant="contained" 
                type="submit"
                style={{ backgroundColor: "#CAD3B9", color: "#333333", marginTop: 30 }} 
                >
                Login
                </Button>
                </form>
            </div>

            <p style={{ fontSize: 13, marginTop: 30 }}>
            New to this application? <button className="landing-button" onClick={toggleForm}>Sign up here</button>.
            </p>
            </div>
        </div>
    );
}