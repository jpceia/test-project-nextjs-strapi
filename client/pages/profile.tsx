import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import PrivateGuard from "../common/components/PrivateGuard";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  
  return (
    <PrivateGuard>
      <h1>Perfil</h1>
      {
        user && (
          <div>
            <p>
              <strong>Nome</strong><br />{user.username}
            </p>
            <p>
              <strong>E-mail</strong><br />{user.email}
            </p>
            <p>
              <strong>Data de registo</strong><br />{new Date(user.createdAt!).toLocaleDateString()}
            </p>
          </div>
        )
      }
    </PrivateGuard>
  );
}

export default Profile;
