import "./scss/default.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./router/index";

window.Toast = () => {};

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
