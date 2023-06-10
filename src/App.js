import { GlobalStyle } from "./components/styles/Globalstyle";
import ProfileInformation from "./components/Profile/ProfileInformation";
import Splash from "./components/Splash/Splash";
import styled from "styled-components";
import RecommendList from "./components/Profile/RecommendList";
import Header from "./components/common/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/AuthorPage/Login/Login";
import SignUp from "./pages/AuthorPage/SignUp/SignUp";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      {/* <Header type="profile" />
      <ProfileInformation />
      <RecommendList />
      <Splash /> */}
      <Login />
      <SignUp />
    </Container>
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //       <Route path="/signup" element={<SignUp />} />
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}
export default App;
