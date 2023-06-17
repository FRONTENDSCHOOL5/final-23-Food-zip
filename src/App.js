import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import Routers from "./routes/Routers";

const Container = styled.div`
  max-width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
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
