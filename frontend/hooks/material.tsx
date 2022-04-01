import { Abi } from "starknet";
import { useContract, useStarknetCall } from "@starknet-react/core";
import { craftedMaterialAbi, primitiveMaterialAbi, wrapCraftedMaterialAbi, wrapPrimitiveMaterialAbi } from "~/abi";
import {
  CraftedMaterialContractAddress,
  PrimitiveMaterialContractAddress,
  WrapCraftedMaterialContractAddress,
  WrapPrimitiveMaterialContractAddress,
} from "~/constants";
import { craftedMaterialList, primitiveMaterialList } from "~/types";
import { numToFelt, feltToNum } from "~/utils/cairo";

export const usePrimitiveMaterials = (account: string): number[] => {
  const { contract } = useContract({
    abi: primitiveMaterialAbi as Abi,
    address: PrimitiveMaterialContractAddress,
  });
  const owners = Object.keys(primitiveMaterialList).map(() => numToFelt(account));
  const tokenIDs = Object.keys(primitiveMaterialList).map((_, i) => [numToFelt(i), numToFelt(0)]);
  const { data: fetchedPrimitiveMaterial } = useStarknetCall({
    contract: contract,
    method: "balance_of_batch",
    args: account ? [owners, tokenIDs] : [],
  });
  // @ts-ignore
  const primitiveMaterials = fetchedPrimitiveMaterial?.res?.map((material) => feltToNum(material)) || [];
  return primitiveMaterials;
};

export const useCraftedeMaterials = (account: string): number[] => {
  const { contract } = useContract({
    abi: craftedMaterialAbi as Abi,
    address: CraftedMaterialContractAddress,
  });
  const owners = Object.keys(craftedMaterialList).map(() => numToFelt(account));
  const tokenIDs = Object.keys(craftedMaterialList).map((_, i) => [numToFelt(i), numToFelt(0)]);
  const { data: fetchedCraftedMaterial } = useStarknetCall({
    contract: contract,
    method: "balance_of_batch",
    args: account ? [owners, tokenIDs] : [],
  });
  // @ts-ignore
  const craftedMaterials = fetchedCraftedMaterial?.res?.map((material) => feltToNum(material)) || [];
  return craftedMaterials;
};

export const useWrapPrimitiveMaterials = (account: string): number[] => {
  const { contract } = useContract({
    abi: wrapPrimitiveMaterialAbi as Abi,
    address: WrapPrimitiveMaterialContractAddress,
  });
  const owners = Object.keys(primitiveMaterialList).map(() => numToFelt(account));
  const tokenIDs = Object.keys(primitiveMaterialList).map((_, i) => [numToFelt(i), numToFelt(0)]);
  const { data: fetchedWrapPrimitiveMaterial } = useStarknetCall({
    contract: contract,
    method: "balance_of_batch",
    args: account ? [owners, tokenIDs] : [],
  });
  // @ts-ignore
  const wrapPrimitiveMaterials = fetchedWrapPrimitiveMaterial?.res?.map((material) => feltToNum(material)) || [];
  return wrapPrimitiveMaterials;
};

export const useWrapCraftedMaterials = (account: string): number[] => {
  const { contract } = useContract({
    abi: wrapCraftedMaterialAbi as Abi,
    address: WrapCraftedMaterialContractAddress,
  });
  const owners = Object.keys(craftedMaterialList).map(() => numToFelt(account));
  const tokenIDs = Object.keys(craftedMaterialList).map((_, i) => [numToFelt(i), numToFelt(0)]);
  const { data: fetchedWrapCraftedMaterial } = useStarknetCall({
    contract: contract,
    method: "balance_of_batch",
    args: account ? [owners, tokenIDs] : [],
  });
  // @ts-ignore
  const wrapCraftedMaterials = fetchedWrapCraftedMaterial?.res?.map((material) => feltToNum(material)) || [];
  return wrapCraftedMaterials;
};
