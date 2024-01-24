import "./App.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router";


function App() {
  return <div className="bg-gray-200">
   <NavBar/>
   <Outlet/>
  </div>
}

export default App;
