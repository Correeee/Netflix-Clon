import { BrowserRouter, HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Browse from './screens/browse/browse';
import Player from './screens/player/player';
import News from './screens/news/news'
import MyList from './screens/mylist/mylist'
import AuthProvider from './context/authContext';
import Register from './screens/register/register';
import Profiles from './screens/profiles/profiles';
import ManageProfiles from './screens/manageProfiles/manageProfiles';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App" id='App'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register/:email' element={<Register />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route path='/manageprofiles' element={<ManageProfiles />} />
            <Route path='/browse' element={<Browse />} />
            <Route path='/browse/:fid' element={<Browse />} />
            <Route path='/series' element={<Browse />} />
            <Route path='/series/:fid' element={<Browse />} />
            <Route path='/movies' element={<Browse />} />
            <Route path='/movies/:fid' element={<Browse />} />
            <Route path='/browse/player/:fid' element={<Player />} />
            <Route path='/movies/player/:fid' element={<Player />} />
            <Route path='/series/player/:fid' element={<Player />} />
            <Route path='mylist/movies/player/:fid' element={<Player />} />
            <Route path='mylist/series/player/:fid' element={<Player />} />
            <Route path='news/movies/player/:fid' element={<Player />} />
            <Route path='news/series/player/:fid' element={<Player />} />
            <Route path='/news' element={<News />} />
            <Route path='/news/movies/:fid' element={<News />} />
            <Route path='/news/series/:fid' element={<News />} />
            <Route path='/mylist' element={<MyList />} />
            <Route path='/mylist/movies/:fid' element={<MyList />} />
            <Route path='/mylist/series/:fid' element={<MyList />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
