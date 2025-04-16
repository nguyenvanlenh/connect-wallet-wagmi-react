import { createBrowserRouter } from "react-router-dom";
import ClientComponent from "./pages/ClientComponent";
import HomeComponent from "./pages/HomeComponent";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <HomeComponent />,

    },
    {
        path: "/component-authoried",
        element: <ProtectedRoute><ClientComponent /></ProtectedRoute>,

    }
])