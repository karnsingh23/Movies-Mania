import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css'; // Import CSS for styling
import {jwtDecode} from 'jwt-decode';
const base_url = process.env.REACT_APP_BASE_URL;
const api_key = process.env.REACT_APP_API_KEY
function Profile() {
  
    const [fullMoviesData, setFullMoviesData] = useState([]);
    const [isViewingFavorites, setIsViewingFavorites] = useState(false); // State to toggle favorite view
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
            
            axios
                .get(`${base_url}/api/auth/getfavourites`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    const movieIds = res.data.favourites.map(fav => fav.movieId); // Extract movieIds
                    
                    fetchMovieDetails(movieIds); // Fetch full movie details
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        
    }, [token,fullMoviesData]);

    // Fetch movie details using movieIds
    const fetchMovieDetails = (movieIds) => {
        const movieRequests = movieIds.map(movieId => 
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`) // Replace with your actual API key
        );
        
        // Wait for all movie requests to complete
        Promise.all(movieRequests)
            .then((responses) => {
                const movieData = responses.map(res => res.data);
                setFullMoviesData(movieData); // Store full movie data
            })
            .catch((err) => {
                alert("Failed to fetch movie details: " + err.message);
            });
    };

   const deleteFavourites=(id)=>{
    const token = localStorage.getItem('token');
        axios.delete(`${base_url}/api/auth/delete`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: {
                movieId: id, 
              },
        })
        .then(()=>{console.log("deleted success");
        })
        .catch((err)=>{alert(err.message);
        })
   }

     

    const toggleFavoritesView = () => {
        setIsViewingFavorites(!isViewingFavorites); 
    };


    return (
        <div className="profile-cont">
            <div className="profile-header">
                <h1>Welcome, {username}</h1>
            </div>

            <div className="profile-body">
                <button className="favorites-button" onClick={toggleFavoritesView}>
                    {isViewingFavorites ? 'Hide Favorites' : 'View Favorites'}
                </button>

                {isViewingFavorites && fullMoviesData.length > 0 && (
                    <div className="favorites-list">
                        {fullMoviesData.map((movie, index) => (
                            <div key={index} className="movie-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.original_title}
                                    className="movie-image"
                                />
                                <div className="movie-details">
                                    <h2 className="movie-title">{movie.original_title}</h2>
                                    <p className="movie-runtime">{movie.release_date}</p>
                                    <p className="movie-description">{movie.overview.slice(0, 120)}...</p>
                                </div>
                                <button onClick={()=>{deleteFavourites(movie.id)}}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {isViewingFavorites && fullMoviesData.length === 0 && (
                    <p>No favorites found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
