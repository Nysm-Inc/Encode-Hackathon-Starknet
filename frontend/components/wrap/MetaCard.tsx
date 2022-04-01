import { Box, Center, Flex, HStack, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { VFC } from "react";
import { Text } from "~/components/common";
import { Meta } from "~/public";

const MetaCard: VFC = () => {
  return (
    <Flex w="80" h="16" bgColor="gray.800" border="1px solid" borderColor="gray.600" borderRadius="md" justify="center">
      <Center>
        <Image width="32px" height="32px" src={Meta} />
        <Text fontSize="xl">Meta | Materials</Text>
      </Center>
    </Flex>
  );
};

export default MetaCard;
