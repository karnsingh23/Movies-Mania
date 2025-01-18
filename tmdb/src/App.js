import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Search from './pages/search/search';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import { useState } from 'react';
import Profile from './pages/profile/profile';
import Footer from './components/footer/footer';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // Check initial login state
);
  return (
    <div className="App">
        <Router>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path='/signup' element={<Signup  setIsLoggedIn={setIsLoggedIn} />}></Route>
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="search/:keyword" element={<Search/>}></Route>
                <Route path='myProfile' element={<Profile/>}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;