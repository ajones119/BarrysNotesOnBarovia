import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Routing } from "./routing";


function App() {
  return (
      <div className="App">
        <Routing />
      </div>
  );
}

export default App;
