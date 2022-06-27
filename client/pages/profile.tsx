import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import PrivateLayout from "../common/components/PrivateLayout";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  
  return (
    <PrivateLayout>
      <p>
        <strong>Nome:</strong>{user?.username}
      </p>
      <p>
        <strong>E-mail:</strong>{user?.email}
      </p>
      <p>
        <strong>Data de registo:</strong>{user?.createdAt}
      </p>
    </PrivateLayout>
  );
}

export default Profile;
