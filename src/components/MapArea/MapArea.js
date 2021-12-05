import proj4 from "proj4";
import React, { useEffect } from "react";
const { kakao } = window;
let map;

const MapArea = ({ keyword, getBox, info }) => {
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    const geoCallback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const center = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.panTo(center);
      }
    };
    if (keyword) geocoder.addressSearch(keyword, geoCallback);
  }, [keyword]);

  useEffect(() => {
    getBox();
  }, []);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    };
    map = new kakao.maps.Map(container, options);

    if (!info) return;

    const grs80 =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    const positions = new Array();
    // 마커를 표시할 위치와 title 객체 배열입니다
    for (let i = 0; i < info.length; i++) {
      const p = proj4(grs80, wgs84, [info[i].G2_XMAX, info[i].G2_YMAX]);
      positions.push({
        title: info[i].RM,
        latlng: new kakao.maps.LatLng(p[1], p[0]),
      });
    }

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, [info]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
};

export default MapArea;
