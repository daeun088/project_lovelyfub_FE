import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import { LoginProvider } from './components/Layout/Header/Login/LoginContext';
import Header from './components/Layout/Header/Header';
import Mainpage from './pages/Mainpage'
import Marketpage from './pages/Marketpage'
import Cafepage from './pages/Cafepage'
import Mappage from './pages/Mappage';
import Userpage from './pages/Userpage'
import OAuthRedirect from './pages/OAuthRedirect';
import { UserDataProvider } from './components/User/UserDataContext';

function App() {
  return (
    <div className="App">
      <Router>
        <UserDataProvider>
          <LoginProvider>
            <Header />
            <Routes>
              <Route path='/main' element={<Mainpage/>} />
              <Route path='/market' element={<Marketpage/>}/>
              <Route path='/cafe' element={<Cafepage/>}/>
              <Route path='/map' element={<Mappage/>}/>
              <Route path='/user/mypage' element={<Userpage/>}/>
              <Route path='/oauth/redirect' element={<OAuthRedirect/>} >
              </Route>
            </Routes>
          </LoginProvider>
        </UserDataProvider>
      </Router>
    </div>
  );
}

export default App;
