import { GlobalStyle } from "./components/styles/Globalstyle";
import ProfileInformation from "./components/Profile/ProfileInformation";
import Splash from "./components/Splash/Splash";
import styled from "styled-components";
import RecommendList from "./components/Profile/RecommendList";
import Header from "./components/common/Header/Header";

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Header type="profile" />
      <ProfileInformation />
      <RecommendList />
      <Splash />
    </Container>
  );
}
export default App;
