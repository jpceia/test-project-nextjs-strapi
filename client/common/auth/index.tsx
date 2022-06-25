import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
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

  const resetStates = () => {
    setJwt('');
    setUser(null);
    setError('');
  }

  const registerUser = (username: string, email: string, password: string) => {

    resetStates();
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local/register`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      username,
      email,
      password
    });

    fetch(url, {
      method: 'POST',
      headers,
      body
    }).then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          setJwt(json.jwt);
          setUser(json.user);
        }
        setIsLoading(false);
      });
  };

  const loginUser = (email: string, password: string) => {

    resetStates();
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      identifier: email,
      password
    });

    fetch(url, {
      method: 'POST',
      headers,
      body
    }).then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setError(json.error.message);
        }
        else {
          setJwt(json.jwt);
          setUser(json.user);
        }
        setIsLoading(false);
      });
  };

  const logoutUser = () => {
    resetStates();
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
