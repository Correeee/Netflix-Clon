import { useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY_TMDB
const BEARER = process.env.REACT_APP_BEARER_TMDB

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`
    }
};

export const APITrendingAll = () =>
    fetch(`https://api.themoviedb.org/3/trending/all/week?language=${localStorage.getItem('language')}`, options)
        .then(response => {
            response.json();
        })
        .catch(err => console.error(err));

export const APITrendingMovies = () =>
    fetch(`https://api.themoviedb.org/3/trending/movie/week?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));

export const APITrendingSeries = () =>
    fetch(`https://api.themoviedb.org/3/trending/tv/week?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));

export const APIGenreMovies = () =>
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGenreSeries = () =>
    fetch(`https://api.themoviedb.org/3/genre/tv/list?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGeneresMovie = (GENRE_ID) =>
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}&language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGeneresSeries = (GENRE_ID) =>
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${GENRE_ID}&language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APISearchMovieForId = (fid) => fetch(`https://api.themoviedb.org/3/movie/${fid}?api_key=${API_KEY}&language=${localStorage.getItem('language')}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

export const APISearchSerieForId = (fid) => fetch(`https://api.themoviedb.org/3/tv/${fid}?api_key=${API_KEY}&language=${localStorage.getItem('language')}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

export const APISearchForMovieGenere = (gid) => fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=popularity.desc&with_genres=${gid}&language=${localStorage.getItem('language')}`, options)
    .then(response => response.json())
    .catch(error => console.error(error));

export const APISearchForSeriesGenere = (gid) => fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${gid}&language=${localStorage.getItem('language')}`, options)
    .then(response => response.json())
    .catch(error => console.error(error));

export const APITopMovies = () =>
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=${localStorage.getItem('language')}&page=1`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APITopSeries = () =>
    fetch(`https://api.themoviedb.org/3/tv/top_rated?language=${localStorage.getItem('language')}&page=1`, options)
        .then(response => response.json())
        .catch(err => console.error(err));


export const APIMoviesToday = () =>
    fetch(`https://api.themoviedb.org/3/trending/movie/day?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APISeriesToday = () =>
    fetch(`https://api.themoviedb.org/3/trending/tv/day?language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

/* ---------------------------- BUSCAR MULTIMEDIA --------------------------- */

export const APISearchMovieVideo = (mid) =>
    fetch(`https://api.themoviedb.org/3/movie/${mid}/videos?api_key=${API_KEY}&language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APISearchSerieVideo = (sid) =>
    fetch(`https://api.themoviedb.org/3/tv/${sid}/videos?api_key=${API_KEY}&language=${localStorage.getItem('language')}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));








