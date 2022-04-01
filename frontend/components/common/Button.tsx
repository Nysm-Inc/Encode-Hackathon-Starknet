import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

const Button: FC<ButtonProps> = (props) => {
  return (
    <ChakraButton fontSize="sm" color="white" bgColor="gray.700" _focus={{ border: "none" }} {...props}>
      {props.children}
    </ChakraButton>
  );
};

export default Button;
