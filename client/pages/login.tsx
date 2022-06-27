import { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import InputEntry from "../common/components/InputEntry";
import PublicGuard from "../common/components/PublicGuard";
import { useGlobalCtx } from "../common/context";
import styles from "../styles/Login.module.css";


const Login: NextPage = () => {

  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const { loginUser, error } = useGlobalCtx();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser(email, password);
  }

  return (
    <PublicGuard>
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
              value="Entrar"
            />
          </div>
        </form>
      </div>
    </PublicGuard>
  );
}

export default Login;
