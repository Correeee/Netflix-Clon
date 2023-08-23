import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Browse from './screens/browse/browse';
import Player from './screens/player/player';


function App() {

  return (
    <BrowserRouter>
      <div className="App" id='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/player' element={<Player />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
