import { VFC } from "react";
import { Center, Flex } from "@chakra-ui/react";
import { MaterialType } from "~/types";
import { Text } from "~/components/common";

const SwitchMaterial: VFC<{ materialType: MaterialType; switchMaterialType: (materialType: MaterialType) => void }> = ({
  materialType,
  switchMaterialType,
}) => {
  return (
    <Flex w="40" h="6" align="center" borderRadius="xl" bgColor="gray.500">
      <Center
        w="20"
        h="6"
        cursor="pointer"
        {...(materialType === "primitive" && {
          bgColor: "primary.100",
          borderRadius: "xl",
        })}
        onClick={() => switchMaterialType("primitive")}
      >
        <Text>Primitive</Text>
      </Center>
      <Center
        w="20"
        h="6"
        cursor="pointer"
        {...(materialType === "crafted" && {
          bgColor: "primary.100",
          borderRadius: "xl",
        })}
        onClick={() => switchMaterialType("crafted")}
      >
        <Text>Crafted</Text>
      </Center>
    </Flex>
  );
};

export default SwitchMaterial;
