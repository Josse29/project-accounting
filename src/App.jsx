import { AllProvider } from "./context/AllProvider";
import { Route1 } from "./routes";

function App() {
  return (
    <AllProvider>
      <Route1 />
    </AllProvider>
  );
}

export default App;
