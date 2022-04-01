import { FC } from "react";
import { Text as ChakraText, TextProps } from "@chakra-ui/react";

const Text: FC<TextProps> = (props) => (
  <ChakraText color="white" fontSize="sm" {...props}>
    {props.children}
  </ChakraText>
);

export default Text;
