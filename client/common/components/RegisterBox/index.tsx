import { useState } from "react";

const RegisterBox = () => {
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");


  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/local/register'`, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        username: name,
        email,
        password
      })
    }).then((response) => response.json())
      .then((json) => {
        const { data } = json;
        console.log("user:", data);
    })
      .catch((error) => {
        const { response } = error;
        console.log("An error ocurred:", response);
    });
  }

  return (
    <div>
      <h3>Registrar</h3>
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
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default RegisterBox;
