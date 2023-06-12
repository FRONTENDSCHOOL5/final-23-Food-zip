import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: white;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
    </Container>
  );
}
export default App;
