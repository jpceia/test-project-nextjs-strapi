import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import Layout from "../common/components/Layout";
import PrivateGuard from "../common/components/PrivateGuard";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  
  return (
    <PrivateGuard>
      <p>
        <strong>Nome:</strong>{user?.username}
      </p>
      <p>
        <strong>E-mail:</strong>{user?.email}
      </p>
      <p>
        <strong>Data de registo:</strong>{user?.createdAt}
      </p>
    </PrivateGuard>
  );
}

export default Profile;
