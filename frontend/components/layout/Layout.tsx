import { FC } from "react";
import { HStack, VStack } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Index: FC = ({ children }) => {
  return (
    <VStack w="100vw" h="100vh" bgColor="black">
      <Header />

      <HStack w="100%" h="100%">
        <Sidebar />
        {children}
      </HStack>
    </VStack>
  );
};

export default Index;
