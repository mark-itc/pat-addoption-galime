import HomeLoggedOut from "./pages/home/loggedOut/HomeLoggedOut";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPetsPage from "./pages/myPetsPage/MyPetsPage";
import Profile from "./pages/profile.js/Profile";
import Admin from "./pages/adminPage/Admin";
import Search from "./pages/searchPage/Search";
import Navbar from "./components/Navbar";
import Articles from "./pages/articles/Articles";

function App() {
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLoggedOut />} />
        <Route path="/mypet" element={<MyPetsPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/articles/:id" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
