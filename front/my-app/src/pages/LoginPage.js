import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import '../CSS/LoginPage.css';
import Login from '../lib/services/login';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    // Define the handleSubmit function
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Submitted with Email:', email, 'Password:', password);
        // Here, add your logic for when the form is submitted (e.g., authentication)
        const isSuccess = await Login(email, password);
        if (isSuccess) {
            navigate("/Dashboard");
        }

        else {
            alert('Login failed!');
        }
    };

    return(
        <div className="login-component">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;