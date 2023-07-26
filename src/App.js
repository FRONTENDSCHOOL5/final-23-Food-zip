import { GlobalStyle } from "./components/styles/Globalstyle";
import styled from "styled-components";
import Routers from "./routes/Routers";
import { RecoilRoot, useRecoilState } from "recoil";
import Modal from "./components/Modal/Modal/Modal";
import { modalState } from "./atoms/modalAtom";

// const Container = styled.div`
//   max-width: 390px;
//   min-height: 100vh;
//   margin: 0 auto;
//   background-color: #fff;
// `;

function App() {
  // const [modal, setModal] = useRecoilState(modalState);
  return (
    <>
      {/* <Container> */}
      <GlobalStyle />
      <Routers />
      {/* {modal.show && <Modal type={modal.type} />} */}
      {/* </Container> */}
    </>
  );
}
export default App;
