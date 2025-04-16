import { store } from "./localstorageUtils";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuth = store("AUTH").get()

    console.log(isAuth);
    const hasAccess = isAuth?.accessToken

    return hasAccess ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;