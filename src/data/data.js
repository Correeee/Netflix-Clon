
const API_KEY = '6b4d2056fede6332be0f70499d14960f'
const BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjRkMjA1NmZlZGU2MzMyYmUwZjcwNDk5ZDE0OTYwZiIsInN1YiI6IjY0ZTgxNjAyZjJjZjI1MDEwMGY3ODVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOZL7aF8qC6ReiSwvVB1KbhJkYUR2YMtbEw1VNiFiOk'


const optionsTrending = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`
    }
};

export const APITrending = () => 
fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', optionsTrending)
    .then(response => response.json())
    .then(response => response.results)
    .catch(err => console.error(err));

const optionsGenre = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`
    }
};

export const APIGenre = () => 
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', optionsGenre)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));




