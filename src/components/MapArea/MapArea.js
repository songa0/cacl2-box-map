import React from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { NaverMap } from "react-naver-maps";
import Styled from "./MapArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MapArea = () => {
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
        submodules={["geocoder"]}
      >
        <Styled.SearchArea>
          <Styled.SearchInput />
          <Styled.SearchBtn>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Styled.SearchBtn>
        </Styled.SearchArea>
        <NaverMap
          id="react-naver-maps-introduction"
          style={{ width: "100%", height: "100vh" }}
          center={{ lat: 37.497175, lng: 127.027926 }}
        ></NaverMap>
      </RenderAfterNavermapsLoaded>
    </>
  );
};

export default MapArea;
