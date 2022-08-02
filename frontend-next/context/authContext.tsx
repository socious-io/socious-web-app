import Router from 'next/router';
import {createContext, useEffect, useState} from 'react';
import useAuth from 'services/useAuth';
import useUser from 'services/useUser';

const AuthContext = createContext({
  user: null,
  signin: (email: string, password: string) => {},
  signout: () => {},
  authVerified: false,
});

export const AuthContextProvider = ({children}) => {
  const {getProfile} = useUser();
  const {login} = useAuth();
  const [user, setUser] = useState(null);
  const [authVerified, setAuth] = useState(false);

  useEffect(() => {
    getProfile()
      .then((response: any) => {
        console.log(response)
        setUser(response);
        setAuth(true);
      })
      .catch((error: any) => {
        console.log(error);
        signout();
      });
  }, []);

  const signin = async (email: string, password: string) => {
    await login({email, password});
    Router.push('/');
  };

  const signout = async () => {
    setAuth(false)
    Router.push('/auth/login');
  };


  const context = {user, signin, signout, authVerified};

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
