import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Browse from './screens/browse/browse';
import Player from './screens/player/player';
import Explorer from './screens/explorer/explorer';
import News from './screens/news/news'
import MyList from './screens/mylist/mylist'


function App() {

  return (
    <BrowserRouter>
      <div className="App" id='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/browse/:fid' element={<Browse />} />
          <Route path='/series' element={<Browse />} />
          <Route path='/series/:fid' element={<Browse />} />
          <Route path='/movies' element={<Browse />} />
          <Route path='/movies/:fid' element={<Browse />} />
          <Route path='/player' element={<Player />} />
          <Route path='/player/:fid' element={<Player />} />
          <Route path='/news' element={<News />} />
          <Route path='/mylist' element={<MyList />} />
          <Route path='/explorer' element={<Explorer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
