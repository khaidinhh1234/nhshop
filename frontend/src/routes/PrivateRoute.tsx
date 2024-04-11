import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  Children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }: any) => {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
