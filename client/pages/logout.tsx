import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";

const Logout: NextPage = () => {
  const { logoutUser } = useGlobalCtx();

  logoutUser();

  return <p>Logging out...</p>;
}

export default Logout;
