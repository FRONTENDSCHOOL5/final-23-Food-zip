import { GlobalStyle } from "./components/styles/Globalstyle";
import Routers from "./routes/Routers";
import { RecoilRoot } from "recoil";

// const Container = styled.div`
//   max-width: 390px;
//   min-height: 100vh;
//   margin: 0 auto;
//   background-color: #fff;
// `;

function App() {
  return (
    <RecoilRoot>
      {/* <Container> */}
      <GlobalStyle />
      <Routers />
      {/* </Container> */}
    </RecoilRoot>
  );
}
export default App;
