import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MapArea from "../components/MapArea/MapArea";
import SearchArea from "../components/SearchArea/SearchArea";
import { click } from "../modules/search";

const MapAreaContainer = () => {
  const keyword = useSelector((state) => state.search.keyword);
  const dispatch = useDispatch();

  return (
    <>
      <SearchArea onClick={(input) => dispatch(click(input))} />
      <MapArea keyword={keyword} />
    </>
  );
};

export default React.memo(MapAreaContainer);
