import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MapArea from "../components/MapArea/MapArea";
import SearchArea from "../components/SearchArea/SearchArea";
import { click } from "../modules/search";
import { getBox } from "../modules/map";

const MapAreaContainer = () => {
  const keyword = useSelector((state) => state.search.keyword);
  const info = useSelector((state) => state.map.info);
  const dispatch = useDispatch();

  return (
    <>
      <SearchArea onClick={(input) => dispatch(click(input))} />
      <MapArea
        keyword={keyword}
        getBox={() => dispatch(getBox())}
        info={info}
      />
    </>
  );
};

export default React.memo(MapAreaContainer);
