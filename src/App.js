import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import Routers from "./routes/Routers";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #e4ebe5;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Routers />
    </Container>
  );
}
export default App;
