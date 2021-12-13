import proj4 from "proj4";
import React, { useEffect } from "react";
import styled from "./MapArea.styled";

const { kakao } = window;
let map, rv, rvClient;
let container, mapWrapper, mapContainer, rvContainer;

const MapArea = React.memo(({ keyword, getBox, info }) => {
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
    //container = document.getElementById("container"); // 지도와 로드뷰를 감싸고 있는 div 입니다
    mapWrapper = document.getElementById("mapWrapper"); // 지도를 감싸고 있는 div 입니다
    mapContainer = document.getElementById("map"); // 지도를 표시할 div 입니다
    rvContainer = document.getElementById("roadview"); //로드뷰를 표시할 div 입니다
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    };
    map = new kakao.maps.Map(mapContainer, options);
    // 로드뷰 객체를 생성합니다
    rv = new kakao.maps.Roadview(rvContainer);

    // 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다
    rvClient = new kakao.maps.RoadviewClient();
    getBox();
  }, []);

  useEffect(() => {
    console.log("info");
    if (!info) return;

    const grs80 =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    const positions = new Array();
    // 마커를 표시할 위치와 title 객체 배열입니다
    for (let i = 0; i < info.length; i++) {
      const p = proj4(grs80, wgs84, [info[i].G2_XMAX, info[i].G2_YMAX]);
      positions.push({
        title: info[i].DETL_CN,
        latlng: new kakao.maps.LatLng(p[1], p[0]),
      });
    }

    // 마커 이미지의 이미지 주소입니다
    //let imageSrc ="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (let i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      //let imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      //let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        //image: markerImage, // 마커 이미지
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: positions[i].title, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
      // 마커에 dragend 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
        // 현재 마커가 놓인 자리의 좌표입니다
        var position = marker.getPosition();

        // 마커가 놓인 위치를 기준으로 로드뷰를 설정합니다
        toggleRoadview(position);
      });
    }
  }, [info]);

  return (
    <styled.Container id="container">
      <styled.MapWrapper>
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
        <div id="roadviewControl"></div>
      </styled.MapWrapper>
      <styled.RvWrapper>
        <div id="roadview" style={{ width: "100%", height: "100%" }}></div>
        <div id="close" title="로드뷰닫기"></div>
      </styled.RvWrapper>
    </styled.Container>
  );
});
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}
// 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
// 로드뷰를 설정하는 함수입니다
function toggleRoadview(position) {
  rvClient.getNearestPanoId(position, 50, function (panoId) {
    // 파노라마 ID가 null 이면 로드뷰를 숨깁니다

    // if (panoId === null) {
    //   toggleMapWrapper(true, position);
    // } else {
    //   toggleMapWrapper(false, position);

    // panoId로 로드뷰를 설정합니다
    rv.setPanoId(panoId, position);
    // }
  });
}
// 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
function toggleMapWrapper(active, position) {
  if (active) {
    // 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다
    //container.className = "";

    // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
    map.relayout();

    // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
    map.setCenter(position);
  } else {
    // 지도만 보여지고 있는 상태이면 지도의 너비가 50%가 되도록 class를 변경하여
    // 로드뷰가 함께 표시되게 합니다
    // if (container.className.indexOf("view_roadview") === -1) {
    //   container.className = "view_roadview";
    //   // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
    //   map.relayout();
    //   // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
    //   map.setCenter(position);
  }
}

export default MapArea;
