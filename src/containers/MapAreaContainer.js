import React from "react";
import { connect } from "react-redux";
import MapArea from "../components/MapArea/MapArea";
import SearchArea from "../components/SearchArea/SearchArea";

const MapAreaContainer = ({ lat, lng }) => {
  return (
    <>
      <SearchArea />
      <MapArea lat={lat} lng={lng} />
    </>
  );
};

export default connect(
  ({ map }) => ({ lat: map.lat, lng: map.lng }),
  {}
)(MapAreaContainer);
