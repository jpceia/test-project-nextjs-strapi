import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useAuth } from "../common/auth";

const Logout: NextPage = () => {
  const router = useRouter();
  const { logoutUser } = useAuth();

  logoutUser();

  return <p>Logging out...</p>;
}

export default Logout;
