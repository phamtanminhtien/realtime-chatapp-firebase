import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Extra/Loading";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;

        setUser({ displayName, uid, photoURL, email });
        history.push("/");
        setIsLoading(false);

        return;
      }

      history.push("/login");
      setIsLoading(false);
    });
    return unsubscribed;
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
