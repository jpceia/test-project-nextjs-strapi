import { NextPage } from "next";
import PublicGuard from "../common/components/PublicGuard";
import { SyntheticEvent, useState } from "react";
import { useGlobalCtx } from "../common/context";
import InputEntry from "../common/components/InputEntry";


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
            value={email}
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
