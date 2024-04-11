import Router from "./routes/index";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}
export default App;
