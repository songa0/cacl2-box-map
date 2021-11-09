import styled from "styled-components";

const SearchArea = styled.form`
  position: fixed;
  display: flex;
  z-index: 1;
  margin: 8px;
  height: 2.6rem;
  min-width: 30px;
  max-width: 400px;
  width: 90%;
  border-radius: 6px;
  box-shadow: 1px 1px 3px 1px #696868;
  background: white;
`;
const SearchBtn = styled.button`
  border: none;
  background: white;
  width: 10%;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  height: 85%;
  margin-right: 5px;
  outline: none;
  border: none;
  border-radius: 10px;
  flex: 1;
  padding: 3px 10px;
`;

export default { SearchArea, SearchBtn, SearchInput };
