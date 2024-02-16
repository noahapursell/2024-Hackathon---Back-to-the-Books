import React, {useState} from "react";
import '../CSS/RegisterPage.css';
import Register from '../lib/services/register';



const RegisterPage = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [canvasToken, setCanvasToken] = useState('');

    
    // Define the handleSubmit function
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Submitted with Email:', email, 'Password:', password);
        // Here, add your logic for when the form is submitted (e.g., authentication)
        Register(firstName, lastName, email, password, phone, canvasToken);
    };

    return(
        <div className="register-component">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm<br/>Password: </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone: </label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="canvasToken">Canvas<br/>Token: </label>
                    <input
                        type="text"
                        id="canvasToken"
                        value={canvasToken}
                        onChange={(e) => setCanvasToken(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;