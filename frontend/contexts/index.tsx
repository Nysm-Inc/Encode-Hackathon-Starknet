import { FC, createContext, useState } from "react";

type AppContext = {
  account: string;
  setAccount: (account: string) => void;
};

const defaultAppContext: AppContext = {
  account: "",
  setAccount: () => {},
};

export const AppContext = createContext<AppContext>(defaultAppContext);

const AppContextProvider: FC = ({ children }) => {
  const [account, setAccount] = useState("");

  return (
    <AppContext.Provider
      value={{
        account: account,
        setAccount: (account: string) => setAccount(account),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
