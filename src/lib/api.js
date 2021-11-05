import axios from "axios";

export const getGeocode = (keyword) => {
  axios.get(`/map-geocode/v2/geocode`, {
    params: { query: keyword },
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NCP_CLIENT_SECRET,
    },
  });
};
