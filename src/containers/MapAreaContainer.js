import React from "react";
import { connect } from "react-redux";
import MapArea from "../components/MapArea/MapArea";
import { getGeo } from "../modules/map";

const MapAreaContainer = ({ getGeo, lat, lng }) => {
  return <MapArea getGeo={getGeo} />;
};

export default connect(({ map }) => ({ lat: map.lat, lng: map.lng }), {
  getGeo,
})(MapAreaContainer);
