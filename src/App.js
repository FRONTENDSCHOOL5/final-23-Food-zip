import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import Routers from "./routes/Routers";
import RandomRecommendContext from "./components/RandomRecommend/RandomRecommendContext";

const Container = styled.div`
  max-width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
`;

function App() {
  return (
    <RandomRecommendContext>
      <Container>
        <GlobalStyle />
        <Routers />
      </Container>
    </RandomRecommendContext>
  );
}
export default App;
