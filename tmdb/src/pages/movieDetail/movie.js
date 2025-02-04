import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
const api_key = process.env.REACT_APP_API_KEY
const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const [trailerUrl, setTrailerUrl] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        getData()
        video()
        window.scrollTo(0,0)
    }, [id])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch((err)=>{alert(err)})
    }

    const video = () =>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`)
        .then((res) => res.json())
            .then((data) => {
                const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Clip' || video.type === 'Trailer');
                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
                }
                console.log(trailerUrl);
                
            })
            .catch((err) => console.error('Error fetching trailer:', err));
    }
    

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
                
            </div>

            {trailerUrl ? (
                        <iframe
                            className="videoFrame"
                            width="560"
                            height="315"
                            src={trailerUrl.replace('watch?v=', 'embed/')}
                            frameBorder="0"
                            allowFullScreen
                            title="Trailer"
                        ></iframe>
                    ) : (
                        <p>Trailer not available</p>
                    )}
            
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie