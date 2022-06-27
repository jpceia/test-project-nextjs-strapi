import { NextPage } from "next";
import PublicGuard from "../common/components/PublicGuard";
import { SyntheticEvent, useState } from "react";
import { useGlobalCtx } from "../common/context";


const Register: NextPage = () => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const { registerUser, error } = useGlobalCtx();


  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser(name, email, password);
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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default Register;
