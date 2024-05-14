import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import DashboradRoute from "./pages/Dashboard/DashboradRoute";
import Pdfviewer from "./components/pdf/Pdfviewer";
import { ComponentProvider } from "./Context/ComponentContext";

function App() {
  return (
    <>
      <ComponentProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard/*" element={<DashboradRoute />}></Route>
          <Route path="/output/:inspectionId" element={<Pdfviewer />}></Route>
        </Routes>
      </ComponentProvider>
    </>
  );
}

export default App;
