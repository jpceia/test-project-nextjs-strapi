import { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import PublicGuard from "../common/components/PublicGuard";
import { useGlobalCtx } from "../common/context";


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
      <div>
        { error && <p style={{color: "red"}}>{error}</p> }
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
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
    </PublicGuard>
  );
}

export default Login;
