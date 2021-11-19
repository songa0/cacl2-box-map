import React, { useRef } from "react";
import Styled from "./SearchArea.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchArea = ({ onClick }) => {
  const keyword = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    onClick(keyword.current.value);
  };
  return (
    <Styled.SearchArea onSubmit={onSubmit}>
      <Styled.SearchInput ref={keyword} />
      <Styled.SearchBtn>
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </Styled.SearchBtn>
    </Styled.SearchArea>
  );
};

export default SearchArea;
