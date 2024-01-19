import "./App.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return <div>
   <NavBar/>
   <Outlet/>
  </div>
}

export default App;
