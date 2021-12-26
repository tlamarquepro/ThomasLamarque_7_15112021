import "../styles/App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Accueil from "./Accueil";
import Mur from "./Mur";
import Profil from "./Profil";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

function App() {
  const [listOfPosts, setListofPosts] = useState([]);
  useEffect(() => {
    axios.get(`${urlAPI}api/posts`).then((response) => {
      setListofPosts(response.data);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/wall" element={<Mur />} />
          <Route path="/profile" element={<Profil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
