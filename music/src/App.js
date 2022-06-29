import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      //split("&")[0] cắt hết phần bên phải kí tự & 
      //split("=")[1] cắt hết phần bên trái kí tự =

      //console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch])

  return (
    <div>
      {token ? <Spotify /> : <Login />}
    </div>
  );
}

export default App;
