import "../styles/App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import Accueil from "./Accueil";
import Mur from "./Mur";
import Profil from "./Profil";
import { UidContext } from "./AppContext";
import { getUser } from "../actions/user.actions";


// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

function App() {
  // Tous les posts
  const [listOfPosts, setListofPosts] = useState([]);
  useEffect(() => {
    axios.get(`${urlAPI}api/posts`).then((response) => {
      setListofPosts(response.data);
    });
  }, []);

  // Maintenir la connexion
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("Pas de token"));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid))
  }, [uid]);

  return (
    <div className="App">
      <UidContext.Provider value={uid}>
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/wall" element={<Mur />} />
            <Route path="/profile" element={<Profil />} />
          </Routes>
        </Router>
      </UidContext.Provider>
    </div>
  );
}

export default App;
