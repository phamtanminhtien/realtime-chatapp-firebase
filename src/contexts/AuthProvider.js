import { Spin } from "antd";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;

        setUser({ displayName, uid, photoURL, email });
        console.log({ displayName, uid, photoURL });

        setIsLoading(false);
        history.push("/");
        return;
      }

      setIsLoading(false);
      history.push("/login");
    });
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin></Spin> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
