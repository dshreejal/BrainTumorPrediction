import ToastMessage from "./components/toast/ToastMessage";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <ToastMessage />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
