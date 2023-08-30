
const API_KEY = '6b4d2056fede6332be0f70499d14960f'
const BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjRkMjA1NmZlZGU2MzMyYmUwZjcwNDk5ZDE0OTYwZiIsInN1YiI6IjY0ZTgxNjAyZjJjZjI1MDEwMGY3ODVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOZL7aF8qC6ReiSwvVB1KbhJkYUR2YMtbEw1VNiFiOk'


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`
    }
};

export const APITrending = () =>
    fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));


export const APIGenre = () =>
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APIGeneresMovie = (GENRE_ID) =>
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

export const APISearchMovieForId = (fid) => fetch(`https://api.themoviedb.org/3/movie/${fid}?api_key=${API_KEY}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));

export const APISearchForGenere = (gid) => fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${gid}`, options)
    .then(response => response.json())
    .catch(error => console.error(error));









