
const API_KEY = '6b4d2056fede6332be0f70499d14960f'
const BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjRkMjA1NmZlZGU2MzMyYmUwZjcwNDk5ZDE0OTYwZiIsInN1YiI6IjY0ZTgxNjAyZjJjZjI1MDEwMGY3ODVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOZL7aF8qC6ReiSwvVB1KbhJkYUR2YMtbEw1VNiFiOk'


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`
    }
};

export const APITrendingAll = () =>
    fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

export const APITrendingMovies = () =>
    fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));

export const APITrendingSeries = () =>
    fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));


export const APIGenreMovies = () =>
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGenreSeries = () =>
    fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGeneresMovie = (GENRE_ID) =>
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGeneresSeries = (GENRE_ID) =>
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${GENRE_ID}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APISearchMovieForId = (fid) => fetch(`https://api.themoviedb.org/3/movie/${fid}?api_key=${API_KEY}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

export const APISearchSerieForId = (fid) => fetch(`https://api.themoviedb.org/3/tv/${fid}?api_key=${API_KEY}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

export const APISearchForMovieGenere = (gid) => fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${gid}`, options)
    .then(response => response.json())
    .catch(error => console.error(error));

export const APISearchForSeriesGenere = (gid) => fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${gid}`, options)
    .then(response => response.json())
    .catch(error => console.error(error));









