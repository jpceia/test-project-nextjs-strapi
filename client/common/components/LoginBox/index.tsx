import { useState } from "react";
import styles from "../../../styles/Home.module.css";

const LoginBox = () => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ errorMessage, setErrorMessage ] = useState<string>("");

  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/local`, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        email,
        password
      }),
    }).then((response) => response.json())
      .then((json) => {
        setErrorMessage("")
    }).catch(
      (error) => setErrorMessage(error)
    )
  }

  return (
    <div className={styles.login}>
      <h3>Login</h3>
      { errorMessage && <p style={{color: "red"}}>errorMessage</p> }
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Entrar"
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
