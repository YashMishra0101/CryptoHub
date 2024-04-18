import NavBar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-gray-900">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
