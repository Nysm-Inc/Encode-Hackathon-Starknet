import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { Abi } from "starknet";
import { useContract, useStarknetInvoke, useStarknetTransactionManager } from "@starknet-react/core";
import { Box, Flex, IconButton, useTheme, VStack } from "@chakra-ui/react";
import { wrapAbi } from "~/abi";
import { RiArrowLeftRightLine, RiArrowRightLine } from "react-icons/ri";
import BarLoader from "react-spinners/BarLoader";
import { WrapContractAddress } from "~/constants";
import { AppContext } from "~/contexts";
import { MetaCard, PhiCard, Inventry } from "~/components/wrap";
import { Button, Text } from "~/components/common";
import { numToFelt } from "~/utils/cairo";
import { Cart, craftedMaterialList, primitiveMaterialList, MaterialType, WrapType } from "~/types";
import SwitchMaterial from "~/components/wrap/SwitchMaterial";
import {
  useCraftedeMaterials,
  usePrimitiveMaterials,
  useWrapCraftedMaterials,
  useWrapPrimitiveMaterials,
} from "~/hooks/material";

const Index: NextPage = () => {
  const { account } = useContext(AppContext);
  const { contract: wrapContract } = useContract({
    abi: wrapAbi as Abi,
    address: WrapContractAddress,
  });
  const theme = useTheme();
  const { transactions = [] } = useStarknetTransactionManager();

  const primitiveMaterials = usePrimitiveMaterials(account);
  const craftedMaterials = useCraftedeMaterials(account);
  const wrapPrimitiveMaterials = useWrapPrimitiveMaterials(account);
  const wrapCraftedMaterials = useWrapCraftedMaterials(account);
  const [isWrapping, setIsWrapping] = useState(false);
  const [wrapType, setWrapType] = useState<WrapType>("wrap");
  const [materialType, setMaterialType] = useState<MaterialType>("primitive");
  const switchWrapType = useCallback(() => setWrapType((prev) => (prev === "wrap" ? "unwrap" : "wrap")), []);
  const switchMaterialType = useCallback((materialType: MaterialType) => setMaterialType(materialType), []);
  const swapByWrapType = useCallback((a, b): [x: any, y: any] => (wrapType === "wrap" ? [a, b] : [b, a]), [wrapType]);
  const label = swapByWrapType("meta", "phi");
  const card = swapByWrapType(<MetaCard />, <PhiCard />);
  const primitiveInventry = swapByWrapType(primitiveMaterials, wrapPrimitiveMaterials);
  const craftedInventry = swapByWrapType(craftedMaterials, wrapCraftedMaterials);

  const { invoke: wrapPrimitiveMaterial, data: txWrapPrimitiveMaterial } = useStarknetInvoke({
    contract: wrapContract,
    method: "batch_wrap_primitive_material",
  });
  const { invoke: wrapCraftedMaterial, data: txWrapCraftedMaterial } = useStarknetInvoke({
    contract: wrapContract,
    method: "batch_wrap_crafted_material",
  });
  const { invoke: unwrapPrimitiveMaterial, data: txUnwrapPrimitiveMaterial } = useStarknetInvoke({
    contract: wrapContract,
    method: "batch_unwrap_primitive_material",
  });
  const { invoke: unwrapCraftedMaterial, data: txUnwrapCraftedMaterial } = useStarknetInvoke({
    contract: wrapContract,
    method: "batch_unwrap_crafted_material",
  });

  const [cart, setCart] = useState<Cart>({
    wrap: {
      primitive: [...new Array(primitiveMaterialList.length)].fill(0),
      crafted: [...new Array(craftedMaterialList.length)].fill(0),
    },
    unwrap: {
      primitive: [...new Array(primitiveMaterialList.length)].fill(0),
      crafted: [...new Array(craftedMaterialList.length)].fill(0),
    },
  });
  const addCart = useCallback(
    (id: number) => {
      setCart((prev) => {
        const copied = prev[wrapType][materialType].map((d) => d);
        copied[id] += 1;
        return {
          ...prev,
          [wrapType]: { ...prev[wrapType], [materialType]: copied },
        };
      });
    },
    [wrapType, materialType]
  );
  const removeCart = useCallback(
    (id: number) => {
      setCart((prev) => {
        const copied = prev[wrapType][materialType].map((d) => d);
        copied[id] = copied[id] > 0 ? copied[id] - 1 : copied[id];
        return { ...prev, [wrapType]: { ...prev[wrapType], [materialType]: copied } };
      });
    },
    [wrapType, materialType]
  );
  const wrap = () => {
    let tokenIDs: string[][] = [];
    let amounts: string[] = [];
    cart[wrapType][materialType].forEach((num, id) => {
      if (num > 0) {
        tokenIDs.push([numToFelt(id), numToFelt(0)]);
        amounts.push(num.toString());
      }
    });

    if (wrapType === "wrap") {
      if (materialType === "primitive") {
        wrapPrimitiveMaterial({ args: [numToFelt(account), tokenIDs, amounts] });
      } else {
        wrapCraftedMaterial({ args: [numToFelt(account), tokenIDs, amounts] });
      }
    } else {
      if (materialType === "primitive") {
        unwrapPrimitiveMaterial({ args: [numToFelt(account), tokenIDs, amounts] });
      } else {
        unwrapCraftedMaterial({ args: [numToFelt(account), tokenIDs, amounts] });
      }
    }
  };

  useEffect(() => {
    if (transactions.length <= 0) return;

    transactions.forEach((tx) => {
      const txHashs = [
        txWrapPrimitiveMaterial,
        txWrapCraftedMaterial,
        txUnwrapPrimitiveMaterial,
        txUnwrapCraftedMaterial,
      ];
      if (txHashs.includes(tx.transactionHash)) {
        setIsWrapping(tx.status !== "ACCEPTED_ON_L2");
      }
    });
  }, [
    transactions,
    txWrapPrimitiveMaterial,
    txWrapCraftedMaterial,
    txUnwrapPrimitiveMaterial,
    txUnwrapCraftedMaterial,
  ]);

  return (
    <Flex w="100%" h="100%" justify="space-evenly" align="center" pr="24">
      <VStack h="100%" align="flex-start" justify="space-evenly">
        {card[0]}
        <VStack w="80" h="lg">
          <SwitchMaterial materialType={materialType} switchMaterialType={switchMaterialType} />
          <Inventry
            label={label[0]}
            primitiveMaterials={primitiveInventry[0]}
            craftedMaterials={craftedInventry[0]}
            wrapType={wrapType}
            materialType={materialType}
            cart={cart}
            addCart={addCart}
            removeCart={removeCart}
          />
        </VStack>
      </VStack>
      <VStack h="100%" align="center" justify="space-evenly">
        <IconButton
          aria-label="wrap"
          borderRadius="3xl"
          bgColor="primary.100"
          _focus={{ border: "none" }}
          isDisabled={isWrapping}
          onClick={switchWrapType}
        >
          <RiArrowLeftRightLine
            size="16"
            cursor="pointer"
            color={theme.colors.white}
            style={wrapType === "wrap" ? {} : { transform: "scale(-1, 1)" }}
          />
        </IconButton>
        {isWrapping ? (
          <Flex w="32" h="10" alignItems="center" justifyContent="space-evenly">
            <BarLoader color={theme.colors.primary[100]} loading={isWrapping} />
          </Flex>
        ) : (
          <Button
            w="32"
            h="10"
            borderRadius="3xl"
            bgColor="primary.100"
            onClick={wrap}
            alignItems="center"
            justifyContent="space-between"
            rightIcon={<RiArrowRightLine />}
          >
            <Box />
            <Text fontSize="md" pb="1">
              {wrapType}
            </Text>
          </Button>
        )}
        <Box />
        <Box />
      </VStack>
      <VStack h="100%" align="flex-start" justify="space-evenly">
        {card[1]}
        <VStack w="80" h="lg">
          <Box h="6" />
          <Inventry
            label={label[1]}
            primitiveMaterials={primitiveInventry[1]}
            craftedMaterials={craftedInventry[1]}
            wrapType={wrapType}
            materialType={materialType}
            cart={cart}
            readonly
            addCart={addCart}
            removeCart={removeCart}
          />
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Index;
