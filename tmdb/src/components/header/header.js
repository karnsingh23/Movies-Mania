import React, { useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const searchKeyword = () => {
        if (inputValue) {
            navigate(`search/${inputValue}`);
        }
        
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img
                        className="header__icon"
                        src="https://icon-library.com/images/movie-icon-app/movie-icon-app-6.jpg"
                        alt="IMDB Logo"
                    />
                </Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}>
                    <span>Popular</span>
                </Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
                    <span>Top Rated</span>
                </Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
                    <span>Upcoming</span>
                </Link>
                <div className="search-container">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search"
                        className="search-input"
                    />
                    <button onClick={searchKeyword} className="search-button">
                        <i className="fa-solid fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="headerRight">
                {!isLoggedIn ? (
                    <button onClick={() => navigate("/login")} className="login-btn">
                        Login
                    </button>
                ) : (
                    <div className="profile-container">
                        <button onClick={toggleDropdown} className="authButton">
                            <i className="fa-solid fa-user fa-2x" style={{ color: "#74C0FC" }}></i>
                        </button>
                        {showDropdown && (
                            <div onClick={()=>{setShowDropdown(false)}} className="dropdown-menu">
                                <Link  className="dropdown-item" to={'/myProfile'}>My Profile</Link>
                                <button onClick={handleLogout} className=" btn-logout dropdown-item">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
