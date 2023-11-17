import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import { LoginProvider } from './components/Layout/Header/Login/LoginContext';
import Header from './components/Layout/Header/Header';
import Menu from './components/Layout/Menu/Menu';
import Mainpage from './pages/Mainpage'
import Marketpage from './pages/Marketpage'
import Cafepage from './pages/Cafepage'
import Mappage from './pages/Mappage';
import Mainpage2 from './pages/Mainpage2'
import Userpage from './pages/Userpage'
import OAuthRedirect from './pages/OAuthRedirect';
import Storepage from './pages/StorePage';
import StoreDetailpage from './pages/StoreDetail';
import Contentpage from './pages/Contentpage';
import SearchStorepage from './pages/Searchpage';
import { UserDataProvider } from './components/User/UserDataContext';

function App() {
  return (
    <div className="App">
      <Router>
        <UserDataProvider>
          <LoginProvider>
            <Header />
            <Menu />
            <Routes>
              <Route path='/main' element={<Mainpage2/>} />
              <Route path='/content' element={<Contentpage/>}/>
              <Route path='/content/search' element={<SearchStorepage/>}/>
              <Route path='/main/2' element={<Mainpage/>} />
              <Route path='/market' element={<Marketpage/>}/>
              <Route path='/cafe' element={<Cafepage/>}/>
              <Route path='/map' element={<Mappage/>}/>
              <Route path='/user/mypage' element={<Userpage/>}/>
              <Route path='/store' element={<Storepage/>}/>
              <Route path='/store/:storeId' element={<StoreDetailpage/>}/>
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
