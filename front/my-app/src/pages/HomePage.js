import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../CSS/HomePage.css';

const HomePage = () => {
    return (
            <div className="homePage-links">
                <h1 className="title">BACK TO THE BOOKS</h1>
                <Link to="/LoginPage" className="homePage-Redirect">{'>'} Existing User</Link>
                <Link to="/RegisterPage" className="homePage-Redirect">{'>'} New User</Link>
                {/* <Link to="/AboutPage" className="homePage-Redirect">{'>'} About</Link> */}
            </div>
     );
}
 
export default HomePage;