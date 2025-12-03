import "./assets/styles/style.css";
import Info from "./components/Info/Info";
import Sidebar from "./components/Sidebar/Sidebar";
import Plan from "./components/Plan/Plan";

import AllInfoContext from "./contexts/AllInfoContext";
import { useState, useEffect } from "react";

import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider as RP } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Info />,
      },
      {
        path: "/plan",
        element: <Plan />,
      }
    ]
  }
]);

function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

function App() {
  const [personalInfo, setPersonalInfo] = useState(null);
  useEffect(() => {
    if (personalInfo) {
      alert(`
        Name : ${personalInfo.name}
        Email : ${personalInfo.email}
        Tel : ${personalInfo.tel}
      `);
    }
  }, [personalInfo]);
  return (
    <>
      <AllInfoContext.Provider value={[personalInfo, setPersonalInfo]}>
        <RP router={router} />
      </AllInfoContext.Provider>
    </>
  );
}

export default App;
