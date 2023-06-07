import ProfileInformation from "./components/Profile/ProfileInformation";
// import RecommendList from "./components/Profile/RecommendList";
import { GlobalStyle } from "./styles/Globalstyle";

function App() {
  return (
    <div>
      <GlobalStyle />
      <ProfileInformation/>
      {/* <RecommendList/> */}
    </div>
  );
}
export default App;