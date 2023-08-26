import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import DashBoardScreen from './Screens/DashBoard/DashBoardScreen';
import Path from './Comman/Paths';
import ProductScreen from './Screens/Product/ProductScreens';
import UserScreen from './Screens/User/UserScreen';
import { useState } from 'react';
import LoginScreen from './Screens/Login/LoginScreen';


function App() {

  // eslint-disable-next-line no-unused-vars
  const [Auth, setAuth] = useState(localStorage.getItem("TOKAN") ? true : false)



  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          <Route path={Path.dashboard} element={<Layout Auth={Auth} component={<DashBoardScreen />} />} />
          <Route path={Path.ProductScreen} element={<Layout Auth={Auth} component={<ProductScreen />} />} />
          <Route path={Path.UserScreen} element={<Layout Auth={Auth} component={<UserScreen />} />} />
          <Route path={Path.LoginScreen} element={<LoginScreen Auth={Auth} setAuth={setAuth} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
