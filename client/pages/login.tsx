import { NextPage } from "next";
import LoginBox from "../common/components/LoginBox";
import PublicGuard from "../common/components/PublicGuard";

const Login: NextPage = () => {
  return (
    <PublicGuard>
      <LoginBox />
    </PublicGuard>
  );
}

export default Login;
