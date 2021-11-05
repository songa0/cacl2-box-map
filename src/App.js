import "./App.css";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { NaverMap } from "react-naver-maps";
import { useEffect } from "react";
import * as api from "./lib/api";

function App() {
  useEffect(async () => {
    try {
      const response = await api.getGeocode("강남구");
    } catch (e) {
      throw e;
    }
  }, []);

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
      submodules={["geocoder"]}
    >
      <NaverMap
        id="react-naver-maps-introduction"
        style={{ width: "100%", height: "100vh" }}
        center={{ lat: 37.497175, lng: 127.027926 }}
      ></NaverMap>
    </RenderAfterNavermapsLoaded>
  );
}

export default App;
