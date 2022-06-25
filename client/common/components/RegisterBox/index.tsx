import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../auth";

const RegisterBox = () => {
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const { registerUser, error } = useAuth();


  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser(name, email, password);
  }

  return (
    <div>
      { error && <p style={{color: "red"}}>{error}</p> }
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-name">Nome</label>
          <input
            type="text"
            id="register-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
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

export default RegisterBox;
