import React, { createContext, useState } from 'react';

export const UserAuthContext = createContext({});

const Auth = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <UserAuthContext.Provider value={{ userId, setUserId}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default Auth;
