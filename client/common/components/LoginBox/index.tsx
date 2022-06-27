import { SyntheticEvent, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { useGlobalCtx } from "../../context";

const LoginBox = () => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const { loginUser, error } = useGlobalCtx();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser(email, password);
  }

  return (
    <div className={styles.login}>
      { error && <p style={{color: "red"}}>{error}</p> }
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Entrar"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
