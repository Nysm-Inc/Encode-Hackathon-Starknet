import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { VStack } from "@chakra-ui/react";
import { useContract, useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { dailyBonusAbi, erc20Abi } from "~/abi";
import { Abi } from "starknet";
import { DailyBonusContractAddress, ERC20ContractAddress } from "~/constants";
import { feltToNum, numToFelt } from "~/utils/cairo";
import { AppContext } from "~/contexts";
import { Button } from "~/components/common";

const Index: FC = () => {
  const { account } = useContext(AppContext);
  const router = useRouter();

  // ------- daily -------
  const { contract: dailyBonusContract } = useContract({
    abi: dailyBonusAbi as Abi,
    address: DailyBonusContractAddress,
  });
  const { data: isMintableReward } = useStarknetCall({
    contract: dailyBonusContract,
    method: "check_reward",
    args: account ? [numToFelt(account)] : [],
  });
  const { data: dataLoginTime } = useStarknetCall({
    contract: dailyBonusContract,
    method: "get_login_time",
    args: account ? [numToFelt(account)] : [],
  });
  // @ts-ignore
  const loginTime = feltToNum(dataLoginTime?.last_login_time);
  const { invoke: getReward } = useStarknetInvoke({
    contract: dailyBonusContract,
    method: "get_reward_with_fee",
  });
  const { invoke: getStarterKit } = useStarknetInvoke({
    contract: dailyBonusContract,
    method: "get_start_reward",
  });

  // ------- erc20 -------
  const { contract: erc20Contract } = useContract({
    abi: erc20Abi as Abi,
    address: ERC20ContractAddress,
  });
  const { data: dataAllowance } = useStarknetCall({
    contract: erc20Contract,
    method: "allowance",
    args: account ? [numToFelt(account), numToFelt(DailyBonusContractAddress)] : [],
  });
  // @ts-ignore
  const allowance = feltToNum(dataAllowance?.remaining?.low);
  const { data: dataBalance } = useStarknetCall({
    contract: erc20Contract,
    method: "balanceOf",
    args: account ? [numToFelt(account)] : [],
  });
  // @ts-ignore
  const balance = feltToNum(dataBalance?.balance?.low);
  const { invoke: approve } = useStarknetInvoke({
    contract: erc20Contract,
    method: "approve",
  });

  return (
    <VStack w="40" h="100%">
      {allowance > 0 ? (
        <Button
          w="24"
          bgColor="primary.100"
          disabled={!feltToNum(isMintableReward) || (dataBalance && balance === 0)}
          onClick={() => {
            if (!account) return;
            getReward({ args: [numToFelt(account)] });
          }}
        >
          Mint
        </Button>
      ) : (
        <Button
          w="24"
          bgColor="primary.100"
          disabled={!dataAllowance}
          onClick={() => {
            if (!account) return;
            approve({ args: [numToFelt(DailyBonusContractAddress), [numToFelt(500), numToFelt(0)]] });
          }}
        >
          Approve
        </Button>
      )}
      <Button
        w="24"
        {...(router.pathname === "/craft" && {
          bgColor: "gray.800",
          color: "whiteAlpha.600",
        })}
        onClick={() => router.push("/craft", undefined, { shallow: true })}
      >
        Craft
      </Button>
      <Button
        w="24"
        {...(router.pathname === "/wrap" && {
          bgColor: "gray.800",
          color: "whiteAlpha.600",
        })}
        onClick={() => router.push("/wrap", undefined, { shallow: true })}
      >
        Wrap
      </Button>
      <Button
        w="24"
        {...(router.pathname === "/analytics" && {
          bgColor: "gray.800",
          color: "whiteAlpha.600",
        })}
        onClick={() => router.push("/analytics", undefined, { shallow: true })}
      >
        Analytics
      </Button>
      <Button
        w="24"
        {...(router.pathname === "/voyager" && {
          bgColor: "gray.800",
          color: "whiteAlpha.600",
        })}
        onClick={() => router.push("/voyager", undefined, { shallow: true })}
      >
        Voyager
      </Button>
      {dataLoginTime && loginTime === 0 ? (
        <Button
          w="24"
          bgColor="primary.100"
          onClick={() => {
            if (!account) return;
            getStarterKit({ args: [numToFelt(account)] });
          }}
        >
          StarterKit
        </Button>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default Index;
