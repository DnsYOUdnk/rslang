import React from 'react';

interface ContextInterface {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = React.createContext<ContextInterface | null>(null);
