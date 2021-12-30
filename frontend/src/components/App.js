import "../styles/App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import Accueil from "./Connexion/Accueil";
import Mur from "./Mur/Mur";
import Profil from "./Profil/Profil";
import { UidContext } from "./AppContext";
import { getUser } from "../actions/user.actions";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

function App() {
  // Maintenir la connexion
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "get",
        url: `${urlAPI}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("Pas de token"));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

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
