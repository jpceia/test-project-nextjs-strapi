import { NextPage } from "next";
import { Fragment } from "react";

const Profile: NextPage = () => {
  const name = "";
  const email = "";
  const registerDate = "";
  
  return (
    <Fragment>
      <p>
        <strong>Nome:</strong>{name}
      </p>
      <p>
        <strong>E-mail:</strong>{email}
      </p>
      <p>
        <strong>Data de registo:</strong>{registerDate}
      </p>
    </Fragment>
  );
}

export default Profile;
