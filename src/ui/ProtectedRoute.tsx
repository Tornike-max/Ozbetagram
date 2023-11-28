import { ReactNode } from "react";
import { useUser } from "../features/users/useUser";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "./SpinnerComponent";

type ChildrenType = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ChildrenType) {
  const navigate = useNavigate();
  const { isPending, authenticated } = useUser();

  if (isPending) {
    return <SpinnerComponent />;
  }

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
}
