import { GlobalStyle } from "./components/styles/Globalstyle";
import ProfileInformation from "./components/Profile/ProfileInformation";
import Splash from "./components/Splash/Splash";
import styled from "styled-components";
import RecommendList from "./components/Profile/RecommendList";
import Header from "./components/common/Header/Header";
import Error from "./components/Error/Error";
import Navigation from "./components/common/Header/Nav/Navigation";
import EmptyHome from "./components/Feed/EmptyHome";
import ChatNavigation from "./components/common/Header/Nav/ChatNavigation";
import SearchList from "./components/Search/SearchList";
import ChatList from "./components/Chat/ChatList";
import ReceiveMessage from "./components/Chat/ReceiveMessage";
import SendMessage from "./components/Chat/SendMessage";
const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: white;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      {/* <Header type="profile" /> */}
      <ChatList />
      <ChatList />
      <ChatList />
      <ChatNavigation />
    </Container>
  );
}
export default App;
