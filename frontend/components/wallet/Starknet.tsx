import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { Text } from "@chakra-ui/react";
import { Argent } from "~/public";
import { AppContext } from "~/contexts";
import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { Button } from "~/components/common";

const WalletStarknet = () => {
  const { account, setAccount } = useContext(AppContext);
  const { account: starknetAccount, connect } = useStarknet();
  const [reflesh, setReflesh] = useState(false);

  useEffect(() => {
    if (!starknetAccount) {
      connect(new InjectedConnector());
    } else {
      setAccount(starknetAccount);
    }
  }, [starknetAccount, connect, setAccount, reflesh]);

  useEffect(() => {
    setTimeout(() => setReflesh(true), 1000);
  }, []);

  return (
    <>
      {!account ? (
        <Button
          leftIcon={<Image src={Argent} width="16px" height="16px" />}
          onClick={() => connect(new InjectedConnector())}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button leftIcon={<Image src={Argent} width="16px" height="16px" />}>
          {account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : "No Account"}
        </Button>
      )}
    </>
  );
};

export default WalletStarknet;
