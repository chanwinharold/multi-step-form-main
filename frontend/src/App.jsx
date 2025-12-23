import "./assets/styles/style.css";
import Info from "./components/Info/Info";
import Sidebar from "./components/Sidebar/Sidebar";
import Plan from "./components/Plan/Plan";
import Addon from "./components/Addon/Addon";
import Summary from "./components/Summary/Summary";
import Final from "./components/Final/Final";
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
            },
            {
                path: "/addon",
                element: <Addon />
            },
            {
                path: "/summary",
                element: <Summary />
            },
            {
                path: "/final",
                element: <Final />
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
    return <RP router={router} />
}

export default App;
