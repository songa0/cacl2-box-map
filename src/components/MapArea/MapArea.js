import React, { useEffect, useRef } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { NaverMap } from "react-naver-maps";
import Styled from "./MapArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapArea = ({ getGeo, lat, lng }) => {
  const keyword = useRef();
  let center;
  const onSubmit = (e) => {
    e.preventDefault();
    getGeo(keyword.current.value);
  };

  useEffect(() => {
    const navermap = window.naver;
    if (navermap) {
      center = new navermap.maps.LatLng(lat, lng);
    }
  }, [lat, lng]);

  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
        submodules={["geocoder"]}
      >
        <Styled.SearchArea onSubmit={onSubmit}>
          <Styled.SearchInput ref={keyword} />
          <Styled.SearchBtn>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Styled.SearchBtn>
        </Styled.SearchArea>
        <NaverMap
          id="react-naver-maps-introduction"
          style={{ width: "100%", height: "100vh" }}
          center={center}
        ></NaverMap>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default MapArea;
