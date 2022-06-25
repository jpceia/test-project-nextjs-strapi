import { NextPage } from "next";
import { useAuth } from "../common/auth";

const Logout: NextPage = () => {
  const { logoutUser } = useAuth();

  logoutUser();

  return <p>Logging out...</p>;
}

export default Logout;
