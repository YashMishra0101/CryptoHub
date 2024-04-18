import NavBar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-gray-900 w-full">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
