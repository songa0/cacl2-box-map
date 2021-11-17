import React, { useEffect, useRef } from "react";
import Styled from "./MapArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { kakao } = window;

const MapArea = () => {
  const keyword = useRef();

  useEffect(() => {
    const container = document.getElementById("map");
    console.dir(kakao);
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <Styled.SearchArea>
        <Styled.SearchInput ref={keyword} />
        <Styled.SearchBtn>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </Styled.SearchBtn>
      </Styled.SearchArea>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
};

export default MapArea;
