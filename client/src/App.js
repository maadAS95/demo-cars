import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import AppNavbar from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <AppNavbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
