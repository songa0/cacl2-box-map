import "./App.css";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { NaverMap } from "react-naver-maps";

function App() {
  return (
    <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_MAP_API_KEY}>
      <NaverMap
        id="react-naver-maps-introduction"
        style={{ width: "100%", height: "100vh" }}
        center={{ lat: 37.497175, lng: 127.027926 }}
      ></NaverMap>
    </RenderAfterNavermapsLoaded>
  );
}

export default App;
