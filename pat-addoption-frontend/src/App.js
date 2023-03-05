import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLoggedOut from "./pages/home/loggedOut/HomeLoggedOut";
import HomeLoggedIn from "./pages/home/HomeLoggedIn";
import MyPetsPage from "./pages/myPetsPage/MyPetsPage";
// import Profile from "./pages/profile.js/Profile";
import Admin from "./pages/adminPage/Admin";
import Search from "./pages/searchPage/Search";
import Navbar from "./components/Navbar";
import Articles from "./pages/articles/Articles";
import { DataContext } from "./context/DataContext";
import Profile from "./components/profile.js/Profile";

function App() {
  const [isLogUser, setIsLogUser] = useState(
    localStorage.getItem("Authorization")
  );
  const [userAuth, setUserAuth] = useState({ token: null, isAdmin: false });
  const [isTheCurrentUser, setIsTheCurrentUser] = useState(false);
  const [toEnter, setToEnter] = useState({ login: false, signup: false });
  const [data, setData] = useState();

  useEffect(() => {
    setIsLogUser(isLogUser);
    console.log(userAuth.isAdmin, localStorage.getItem("Authorization"));
  }, [isLogUser, userAuth.isAdmin]);

  return (
    <DataContext.Provider
      value={{
        userAuth,
        setUserAuth,
        isLogUser,
        setIsLogUser,
        toEnter,
        setToEnter,
        isTheCurrentUser,
        setIsTheCurrentUser,
        data,
        setData,
      }}
    >
      <BrowserRouter className="App">
        <Navbar />
        <Routes>
          {!isLogUser && <Route path="/" element={<HomeLoggedOut />} />}
          {isLogUser && <Route path="/" element={<HomeLoggedIn />} />}

          <Route path="/mypet" element={<MyPetsPage />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {userAuth.isAdmin && <Route path="/admin" element={<Admin />} />}

          <Route path="/articles/:id" element={<Articles />} />
        </Routes>
        {/* {!userAuth.isAdmin && <Navigate to="/" />} */}
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
