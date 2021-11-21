import axios from "axios";

export const getGeocode = (keyword) =>
  axios.get(`/map-geocode/v2/geocode`, {
    params: { query: keyword },
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NCP_CLIENT_SECRET,
    },
  });

export const getBoxLoc = () =>
  axios.get(
    `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_DATA_APP_KEY}/json/ListSnowRemoveBox/1/5/`
  );
