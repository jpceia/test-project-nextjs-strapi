import { NextPage } from "next";
import { Router, useRouter } from "next/router";

const Logout: NextPage = () => {
  const router = useRouter();

  router.push("/");
  return <p>Logging out...</p>;
}

export default Logout;
