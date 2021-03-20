import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css"
import Destination from "./Components/Destination/Destination";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import NotMatch from './Components/NotMatch/NotMatch'
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
export const UserContext = createContext()
function App() {
  const [userData,setUserData] = useState({})
  console.log(userData.displayName)
  return (
      <UserContext.Provider value={[userData,setUserData]}>

      <Router>
        <Header></Header>
        <Switch>
            <Route path="/home">
                <Home></Home>
            </Route>
            <Route exact="exact" path="/">
                <Home></Home>
            </Route>
            <PrivateRoute path="/destination/:id">
                <Destination></Destination>
            </PrivateRoute>
            <PrivateRoute path="/destination">
                <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
                <Login></Login>
            </Route>
            <Route path="*">
                <NotMatch></NotMatch>
            </Route>
        </Switch>
    </Router>
      </UserContext.Provider>
  );
}

export default App;
