import { NextPage } from "next";
import { useGlobalCtx } from "../common/context";
import Guard from "../common/components/Guard";

const Profile: NextPage = () => {

  const { user } = useGlobalCtx();
  
  return (
    <Guard condition={!!user}>
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
    </Guard>
  );
}

export default Profile;
