import { BrowserRouter } from "react-router-dom";
import App_Routes from "./routes/App_routes";
import App_routes_manager from "./routes/App_routes_manager";
function App() {
  return (
    <>
      <App_Routes />
      <App_routes_manager />
    </>
  );
}

export default App;
