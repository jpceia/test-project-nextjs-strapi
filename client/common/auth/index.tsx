import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { PropsWithChildren, User } from "../types";

interface AuthContextType {
  jwt: string,
  user: User | null,
  isLoading: boolean,
  error: string,
  registerUser: (username: string, email: string, password: string) => void,
  loginUser: (email: string, password: string) => void,
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType>({
  jwt: '',
  user: null,
  isLoading: false,
  error: '',
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {}
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [ jwt, setJwt ] = useState<string>('');
  const [ user, setUser ] = useState<User | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');
  const router = useRouter();

  const registerUser = (username: string, email: string, password: string) => {

    setUser(null);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local/register`;
    const body = JSON.stringify({
      username,
      email,
      password
    });

    fetch(url, {
      method: 'POST',
      headers: {},
      body
    }).then((response) => response.json())
      .then((json) => {
        const { jwt, user, error } = json;
        if (error) {
          setJwt('');
          setUser(null);
          setError(error.message);
        }
        else {
          setJwt(jwt);
          setUser(user);
          setError('');
        }
      });
  };

  const loginUser = (email: string, password: string) => {

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: email,
        password
      })
    }).then((response) => response.json())
      .then((json) => {
        const { jwt, user, error } = json;
        if (error) {
          console.log(error);
          setJwt('');
          setUser(null);
          setError(error.message);
        }
        else {
          setJwt(jwt);
          setUser(user);
          setError('');
        }
      });
  };

  const logoutUser = () => {
    setUser(null);
    setJwt('');
    setError('');
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{
      jwt, user, isLoading, error,
      registerUser, loginUser, logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
