import type { NextPage } from "next";
import { Link, VStack } from "@chakra-ui/react";
import {
  CraftContractAddress,
  CraftedMaterialContractAddress,
  DailyBonusContractAddress,
  PrimitiveMaterialContractAddress,
  ERC20ContractAddress,
  WrapContractAddress,
  WrapCraftedMaterialContractAddress,
  WrapPrimitiveMaterialContractAddress,
} from "~/constants";
import { useContext } from "react";
import { AppContext } from "~/contexts";
import { numToFelt } from "~/utils/cairo";
import { Text } from "~/components/common";

const Index: NextPage = () => {
  const { account } = useContext(AppContext);
  return (
    <VStack w="100%" h="100%">
      <Text fontSize="3xl">Voyager</Text>
      <Text>owner: {numToFelt(account)}</Text>
      <Link
        href={`https://goerli.voyager.online/contract/${ERC20ContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>ERC20</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${DailyBonusContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Daily Bonus</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${PrimitiveMaterialContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Primitive Material</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${CraftedMaterialContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Crafted Material</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${CraftContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Craft</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${WrapContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Wrap</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${WrapPrimitiveMaterialContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Wrap Primitive Material</Text>
      </Link>
      <Link
        href={`https://goerli.voyager.online/contract/${WrapCraftedMaterialContractAddress}`}
        isExternal
        textDecoration="underline"
        textDecorationColor="white"
      >
        <Text>Wrap Crafted Material</Text>
      </Link>
    </VStack>
  );
};

export default Index;
