import React, { useRef } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { NaverMap } from "react-naver-maps";
import Styled from "./MapArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapArea = ({ getGeo }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    getGeo();
  };
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
        submodules={["geocoder"]}
      >
        <Styled.SearchArea onSubmit={onSubmit}>
          <Styled.SearchInput />
          <Styled.SearchBtn>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Styled.SearchBtn>
        </Styled.SearchArea>
        <NaverMap
          id="react-naver-maps-introduction"
          style={{ width: "100%", height: "100vh" }}
          center={{ lat: 37.5110621, lng: 127.0355215 }}
        ></NaverMap>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default MapArea;
