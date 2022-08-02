import Router from 'next/router';
import {createContext, useEffect, useState} from 'react';
import useUser from 'services/useUser';

const AuthContext = createContext({
  user: null,
  signin: (token: string) => {},
  signout: () => {},
  authVerified: false,
});

export const AuthContextProvider = ({children}) => {
  const {getProfile} = useUser();
  const [user, setUser] = useState(null);
  const [authVerified, setAuth] = useState(false);

  useEffect(() => {
    getProfile()
      .then((response: any) => {
        setUser(response);
        setAuth(true);
      })
      .catch((error: any) => {
        console.log(error);
        signout();
      });
  }, []);

  const signin = async (token: string) => {
    localStorage.setItem('token', token);
    Router.push('/');
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    setAuth(false);
    Router.push('/auth/login');
  };

  const context = {user, signin, signout, authVerified};

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
