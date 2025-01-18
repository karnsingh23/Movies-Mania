

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../../components/card/card';
const api_key = process.env.REACT_APP_API_KEY
function Search() {
    const { keyword } = useParams();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${keyword}&include_adult=true&language=en-US&page=1`) 
            .then((res) => res.json()) 
            .then((response) => setSearchData(response.results)) 
            .catch((err) => alert("api error"));
    }, [keyword]); 

    return (
        <>
            {searchData.length > 0 ? (
                searchData.map((movie) => (
                    <Cards key={movie.id} movie={movie} /> 
                ))
            ) : (
                <>
                <p>No movies found.</p>
                <p className='notice'>Sometimes data may not appear due to an API issue. Refreshing the page 4 to 5 times may resolve the problem. If the issue persists, please try again later or contact support.</p>
                </>
            )}
        </>
    );
}

export default Search;
