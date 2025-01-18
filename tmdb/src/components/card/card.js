import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";


import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false); 

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const addFavourite = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to add to favorites");
                return;
            }
    
            // console.log("Token:", token);
            // console.log("Movie ID:", movie.id);
    
            const response = await axios.post(
                `${base_url}/api/auth/addfavourites`, 
                { movieId: movie.id }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
    
            if (response.status === 201) {
                setIsAddedToFavorites(true); 
               
            }
        } catch (error) {
            console.error("Error adding to favorites:", error.message);
            alert("Already added");
        }
    };
    
    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <div className="cards">
    <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "white" }}
        onClick={(e) => {
            if (e.target.closest('.cards__button')) {
                e.preventDefault();
            }
        }}
    >
        <img
            className="cards__img"
            src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
            alt={movie ? movie.original_title : "movie poster"}
        />
        <div className="cards__overlay">
            <div className="card__title">{movie ? movie.original_title : ""}</div>
            <div className="card__runtime">
                {movie ? movie.release_date : ""}
                <span className="card__rating">
                    {movie ? movie.vote_average : ""} <i className="fas fa-star" />
                </span>
            </div>
            <div className="card__description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
            </div>
        </div>
    </Link>
    <button
    className={`cards__button ${isAddedToFavorites ? "disabled-button" : ""}`}
    onClick={(e) => {
        e.stopPropagation();
        addFavourite();
    }}
    disabled={isAddedToFavorites}
>
    <i className={`fas fa-heart ${isAddedToFavorites ? "filled-heart" : "empty-heart"}`}></i>
</button>

</div>

                
            )}
        </>
    );
};

export default Cards;
