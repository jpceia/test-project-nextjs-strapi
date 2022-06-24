import { NextPage } from "next";
import { Fragment } from "react";
import { useAuth } from "../common/auth";
import PrivateLayout from "../common/components/PrivateLayout";

const Profile: NextPage = () => {

  const { user } = useAuth();
  
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
