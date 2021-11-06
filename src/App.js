import "./App.css";
//import { useEffect } from "react";
//import * as api from "./lib/api";
import MapArea from "./components/MapArea/MapArea";

function App() {
  // useEffect(async () => {
  //   try {
  //     const response = await api.getGeocode("강남구");
  //   } catch (e) {
  //     throw e;
  //   }
  // }, []);

  return <MapArea />;
}

export default App;
