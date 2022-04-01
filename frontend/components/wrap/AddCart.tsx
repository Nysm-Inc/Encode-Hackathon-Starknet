import { Button, Flex } from "@chakra-ui/react";
import { VFC } from "react";
import { Text } from "~/components/common";

const AddCart: VFC<{
  readonly: boolean;
  num: number;
  balance: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}> = ({ readonly, num = 0, balance = 0, handleClickPlus, handleClickMinus }) => {
  return (
    <Flex
      w="32"
      h="8"
      justify="space-evenly"
      align="center"
      bgColor="gray.800"
      border="1px solid"
      borderColor="gray.600"
      borderRadius="md"
      {...(readonly && {
        color: "whiteAlpha.800",
      })}
    >
      {!readonly && (
        <Button variant="unstyled" disabled={num <= 0} onClick={handleClickMinus} _focus={{ border: "none" }}>
          <Text fontSize="2xl">-</Text>
        </Button>
      )}
      {num}
      {!readonly && (
        <Button variant="unstyled" disabled={balance <= num} onClick={handleClickPlus} _focus={{ border: "none" }}>
          <Text fontSize="lg">+</Text>
        </Button>
      )}
    </Flex>
  );
};

export default AddCart;
