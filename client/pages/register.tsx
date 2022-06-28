import { NextPage } from "next";
import Guard from "../common/components/Guard";
import { SyntheticEvent, useState } from "react";
import { useGlobalCtx } from "../common/context";
import InputEntry from "../common/components/InputEntry";
import styles from "../styles/Register.module.css"


const Register: NextPage = () => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const { user, registerUser, error } = useGlobalCtx();


  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser(name, email, password);
  }

  return (
    <Guard condition={!user}>
      <div className={styles.box}>
        { error && <p style={{color: "red"}}>{error}</p> }
        <form onSubmit={onSubmit}>
          <InputEntry
            type="email"
            name="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <InputEntry
            type="text"
            name="name"
            label="Nome"
            value={name}
            setValue={setName}
          />
          <InputEntry
            type="password"
            name="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          <div>
            <input
              className={styles.button}
              type="submit"
              value="Registrar"
            />
          </div>
        </form>
      </div>
    </Guard>
  );
}

export default Register;
