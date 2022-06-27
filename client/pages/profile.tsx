import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import PrivateGuard from "../common/components/PrivateGuard";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  const { username, email, createdAt } = user!;
  const dateStr = new Date(createdAt!).toLocaleDateString();
  
  return (
    <PrivateGuard>
      <h1>Perfil</h1>
      <p>
        <strong>Nome</strong><br />{username}
      </p>
      <p>
        <strong>E-mail</strong><br />{email}
      </p>
      <p>
        <strong>Data de registo</strong><br />{dateStr}
      </p>
    </PrivateGuard>
  );
}

export default Profile;
