import { VFC } from "react";
import { Center, Flex } from "@chakra-ui/react";
import { Text } from "~/components/common";

export type ChartType = "supply" | "burned";

const Switch: VFC<{ chartType: ChartType; switchChartType: (chartType: ChartType) => void }> = ({
  chartType,
  switchChartType,
}) => {
  return (
    <Flex w="40" h="6" align="center" borderRadius="xl" bgColor="transparent" border="1px solid" borderColor="gray.200">
      <Center
        w="20"
        h="6"
        cursor="pointer"
        {...(chartType === "supply" && {
          bgColor: "blue.100",
          borderLeftRadius: "xl",
        })}
        onClick={() => switchChartType("supply")}
      >
        <Text
          {...(chartType === "supply" && {
            color: "blue.500",
            fontWeight: "bold",
          })}
          fontSize="xs"
        >
          Supply
        </Text>
      </Center>
      <Center
        w="20"
        h="6"
        cursor="pointer"
        {...(chartType === "burned" && {
          bgColor: "red.100",
          borderRightRadius: "xl",
        })}
        onClick={() => switchChartType("burned")}
      >
        <Text
          {...(chartType === "burned" && {
            color: "red.500",
            fontWeight: "bold",
          })}
          fontSize="xs"
        >
          Burn
        </Text>
      </Center>
    </Flex>
  );
};

export default Switch;
