import { Abi } from "starknet";
import { useContract, useStarknetCall } from "@starknet-react/core";
import { craftedMaterialAbi, primitiveMaterialAbi } from "~/abi";
import { CraftedMaterialContractAddress, PrimitiveMaterialContractAddress } from "~/constants";
import { feltToNum, numToFelt } from "~/utils/cairo";
import { craftedMaterialList, primitiveMaterialList } from "~/types";

const defaultPrimitiveResponse = [...new Array(primitiveMaterialList.length)].fill(0);
const primitiveArgs = [...new Array(primitiveMaterialList.length)].map((_, id) => [numToFelt(id), numToFelt(0)]);

export const usePrimitiveMaterialSupply = (): { data: number[]; loading: boolean } => {
  const { contract: primitiveMaterialContract } = useContract({
    abi: primitiveMaterialAbi as Abi,
    address: PrimitiveMaterialContractAddress,
  });
  const { data } = useStarknetCall({
    contract: primitiveMaterialContract,
    method: "ERC1155_Enumerable_token_totalSupply_batch",
    args: [primitiveArgs],
  });
  return {
    // @ts-ignore
    data: data?.res.map((d) => feltToNum(d)) || defaultPrimitiveResponse,
    loading: !data,
  };
};

export const usePrimitiveMaterialBurned = (): { data: number[]; loading: boolean } => {
  const { contract: primitiveMaterialContract } = useContract({
    abi: primitiveMaterialAbi as Abi,
    address: PrimitiveMaterialContractAddress,
  });
  const { data } = useStarknetCall({
    contract: primitiveMaterialContract,
    method: "ERC1155_Enumerable_token_burnCounter_batch",
    args: [primitiveArgs],
  });
  return {
    // @ts-ignore
    data: data?.res.map((d) => feltToNum(d)) || defaultPrimitiveResponse,
    loading: !data,
  };
};

const defaultCraftedResponse = [...new Array(craftedMaterialList.length)].fill(0);
const craftedArgs = [...new Array(craftedMaterialList.length)].map((_, id) => [numToFelt(id), numToFelt(0)]);

export const useCraftedMaterialSupply = (): { data: number[]; loading: boolean } => {
  const { contract: craftedMaterialContract } = useContract({
    abi: craftedMaterialAbi as Abi,
    address: CraftedMaterialContractAddress,
  });
  const { data } = useStarknetCall({
    contract: craftedMaterialContract,
    method: "ERC1155_Enumerable_token_totalSupply_batch",
    args: [craftedArgs],
  });
  return {
    // @ts-ignore
    data: data?.res.map((d) => feltToNum(d)) || defaultCraftedResponse,
    loading: !data,
  };
};

export const useCraftedMaterialBurned = (): { data: number[]; loading: boolean } => {
  const { contract: craftedMaterialContract } = useContract({
    abi: craftedMaterialAbi as Abi,
    address: CraftedMaterialContractAddress,
  });
  const { data } = useStarknetCall({
    contract: craftedMaterialContract,
    method: "ERC1155_Enumerable_token_burnCounter_batch",
    args: [craftedArgs],
  });
  return {
    // @ts-ignore
    data: data?.res.map((d) => feltToNum(d)) || defaultCraftedResponse,
    loading: !data,
  };
};
