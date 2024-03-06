import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function SignUpForm({ toggleForm }) {
    return (
        <div className="landing-page">
            <div>
            <img src="src/assets/signup-landing.jpg" />
            </div>
            <div className="landing-section">
            <h1>Sign up here!</h1>
            Sign up.
            <div className="signup-form">
            <FormControl required >
                <Input placeholder="Email" style={{ width: 320, marginBottom: 20 }} />
            </FormControl>
            <FormControl required>
                <Input placeholder="Password" type="password" style={{ width: 320, marginBottom: 20 }} />
            </FormControl>
            <Button variant="contained" style={{ backgroundColor: "#E09B9C", color: "#333333" }}>Sign Up</Button>
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