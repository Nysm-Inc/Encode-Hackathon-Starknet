import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";
import { Abi } from "starknet";
import { useContract, useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { Center, Flex } from "@chakra-ui/react";
import WalletStarknet from "~/components/wallet/Starknet";
import { Button } from "~/components/common";
import { MetaWide } from "~/public";
import { erc20Abi } from "~/abi";
import { ERC20ContractAddress } from "~/constants";
import { feltToNum, numToFelt } from "~/utils/cairo";
import { AppContext } from "~/contexts";

const Index: FC = () => {
  const { account } = useContext(AppContext);
  const { contract } = useContract({
    abi: erc20Abi as Abi,
    address: ERC20ContractAddress,
  });
  const { data: dataBalance } = useStarknetCall({
    contract: contract,
    method: "balanceOf",
    args: account ? [numToFelt(account)] : [],
  });
  // @ts-ignore
  const balance = feltToNum(dataBalance?.balance?.low);

  const { invoke: mint } = useStarknetInvoke({
    contract: contract,
    method: "mint",
  });

  return (
    <Flex w="100%" h="20" justify="space-between" align="center" pl="6" pr="6">
      <Link href="/" passHref>
        <Center cursor="pointer">
          <Image width="168px" height="40px" src={MetaWide} />
        </Center>
      </Link>

      {dataBalance && balance === 0 ? (
        <Button
          bgColor="primary.100"
          onClick={() => {
            if (!account) return;
            mint({ args: [numToFelt(account), [numToFelt(500), numToFelt(0)]] });
          }}
        >
          Claim Test Token
        </Button>
      ) : (
        <></>
      )}
      <WalletStarknet />
    </Flex>
  );
};

export default Index;
