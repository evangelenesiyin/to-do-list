import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function LoginForm({ toggleForm }) {
    return (
        <div className="landing-page">
            <div>
            <img src="src/assets/landing-image.jpg" />
            </div>
            <div className="landing-section">
            <h1>Welcome back!</h1>
            Log in to your account to access your to-do list.
            <div className="login-form">
            <FormControl required >
                <Input placeholder="Email" style={{ width: 320, marginBottom: 20 }} />
            </FormControl>
            <FormControl required>
                <Input placeholder="Password" type="password" style={{ width: 320, marginBottom: 20 }} />
            </FormControl>
            <Button variant="contained" style={{ backgroundColor: "#CAD3B9", color: "#333333" }}>Login</Button>
            </div>
            <p style={{ fontSize: 13, marginTop: 30 }}>
            New to this application? <button className="landing-button" onClick={toggleForm}>Sign up here</button>.
            </p>
            </div>
        </div>
    );
}