import React, { useRef } from "react";
import Styled from "./SearchArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchArea = () => {
  const keyword = useRef();
  return (
    <Styled.SearchArea>
      <Styled.SearchInput ref={keyword} />
      <Styled.SearchBtn>
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </Styled.SearchBtn>
    </Styled.SearchArea>
  );
};

export default SearchArea;
