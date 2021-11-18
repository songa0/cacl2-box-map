import React, { useEffect } from "react";
const { kakao } = window;

const MapArea = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    const geoCallback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
        const center = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.panTo(center);
      }
    };
    geocoder.addressSearch("강서", geoCallback);
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
};

export default MapArea;
