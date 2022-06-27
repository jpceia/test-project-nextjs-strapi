import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import Layout from "../common/components/Layout";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  
  return (
    <Layout>
      <p>
        <strong>Nome:</strong>{user?.username}
      </p>
      <p>
        <strong>E-mail:</strong>{user?.email}
      </p>
      <p>
        <strong>Data de registo:</strong>{user?.createdAt}
      </p>
    </Layout>
  );
}

export default Profile;
