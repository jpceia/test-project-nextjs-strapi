import { NextPage } from "next";
import PublicGuard from "../common/components/PublicGuard";
import RegisterBox from "../common/components/RegisterBox";

const Login: NextPage = () => {
  return (
    <PublicGuard>
      <RegisterBox />
    </PublicGuard>
  );
}

export default Login;
