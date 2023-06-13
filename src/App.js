import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import ProfileInformation from "./components/Profile/ProfileInformation";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: white;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <ProfileInformation type="your" />
    </Container>
  );
}
export default App;
