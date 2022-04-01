import { useContract, useStarknetCall } from "@starknet-react/core";
import { CraftContractAddress } from "~/constants";
import { craftAbi } from "~/abi";
import { Abi } from "starknet";
import { feltToNum, numToFelt } from "~/utils/cairo";

type Method =
  | "check_elapsed_forge_time_soilAndSeed_2_wood"
  | "check_elapsed_forge_time_iron_2_steel"
  | "check_elapsed_forge_time_oil_2_plastic";

export const useElapsedForgeTime = (account: string, method: Method): number => {
  const { contract: craftContract } = useContract({
    abi: craftAbi as Abi,
    address: CraftContractAddress,
  });
  const { data: elapsedForgeTime } = useStarknetCall({
    contract: craftContract,
    method: method,
    args: account ? [numToFelt(account)] : [],
  });
  return feltToNum(elapsedForgeTime);
};
