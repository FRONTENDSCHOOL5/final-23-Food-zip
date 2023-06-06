import Header from "./components/Header/Header";
import { GlobalStyle } from "./styles/Globalstyle";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header type="home" />
    </div>
  );
}
export default App;