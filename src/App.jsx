import { HashRouter as BrowserRouter } from "react-router";
import { AllProvider } from "./context/AllProvider";
import { Route1 } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AllProvider>
        <Route1 />
      </AllProvider>
    </BrowserRouter>
  );
}

export default App;
