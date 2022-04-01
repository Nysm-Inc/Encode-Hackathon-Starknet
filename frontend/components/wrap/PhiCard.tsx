import { Box, Center, Flex, HStack, Link, Spacer, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { VFC } from "react";
import { Text } from "~/components/common";
import { philandURL } from "~/constants";
import { PhiBoy } from "~/public";

const PhiCard: VFC = () => {
  return (
    <HStack
      w="80"
      h="16"
      bgColor="gray.800"
      border="1px solid"
      borderColor="gray.600"
      borderRadius="md"
      align="flex-start"
      pl="2"
      pt="2"
    >
      <Image width="32px" height="32px" src={PhiBoy} />
      <Flex direction="column">
        <Text fontSize="md">Φ</Text>
        <Link
          href={philandURL}
          isExternal
          textDecoration="underline"
          textDecorationColor="white"
          _hover={{ textDecorationColor: "white" }}
        >
          <Text fontSize="xs">{philandURL}</Text>
        </Link>
      </Flex>
      <Text fontSize="xs" pt="1">
        ENS Metaverse
      </Text>
    </HStack>
  );
};

export default PhiCard;
