import { NextPage } from "next";
import { Fragment } from "react";
import { useAuth } from "../common/auth";

const Profile: NextPage = () => {

  const { user } = useAuth();
  
  return (
    <Fragment>
      <p>
        <strong>Nome:</strong>{user?.username}
      </p>
      <p>
        <strong>E-mail:</strong>{user?.email}
      </p>
      <p>
        <strong>Data de registo:</strong>{user?.createdAt}
      </p>
    </Fragment>
  );
}

export default Profile;
