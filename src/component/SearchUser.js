import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.input`
  &:focus {
    outline: none;
  }
`;

const FormBox = styled.form``;

export default function SearchUser() {
  const [summoner, setSummoner] = useState("");
  const history = useHistory();
  const onHandleSubmit = useCallback(
    () => history.push(`/search/summoner?userName=${summoner}`),
    [history, summoner]
  );
  const onHandleChangeName = (e) => setSummoner(e.target.value);
  return (
    <Container>
      <FormBox onSubmit={onHandleSubmit}>
        <SearchBar value={summoner} onChange={onHandleChangeName} />
      </FormBox>
    </Container>
  );
}
