import type { NextPage } from "next";
import { useState, VFC } from "react";
import { Box, Center, Flex, HStack, Spacer, useTheme } from "@chakra-ui/react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import BeatLoader from "react-spinners/BeatLoader";
import { Text } from "~/components/common";
import Switch, { ChartType } from "~/components/analytics/Switch";
import { craftedMaterialList, primitiveMaterialList } from "~/types";
import {
  useCraftedMaterialBurned,
  useCraftedMaterialSupply,
  usePrimitiveMaterialBurned,
  usePrimitiveMaterialSupply,
} from "~/hooks/analytics";

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {},
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        color: "white",
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        minRotation: 60,
        color: "white",
      },
    },
  },
};

const Supply: VFC = () => {
  const theme = useTheme();
  const { data: primitiveSupply, loading: loadingPrimitiveSupply } = usePrimitiveMaterialSupply();
  const { data: craftedSupply, loading: loadingCraftedSupply } = useCraftedMaterialSupply();
  const data = {
    labels: [...primitiveMaterialList, ...craftedMaterialList],
    datasets: [
      {
        label: "Total Supply",
        data: [
          primitiveSupply[0],
          primitiveSupply[2],
          primitiveSupply[4],
          primitiveSupply[6],
          craftedSupply[0],
          craftedSupply[2],
          craftedSupply[4],
          craftedSupply[6],
          craftedSupply[8],
          craftedSupply[10],
          craftedSupply[12],
          craftedSupply[14],
        ],
        backgroundColor: [
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
        ],
      },
    ],
  };
  return (
    <>
      {!loadingPrimitiveSupply && !loadingCraftedSupply ? (
        <Bar options={options} data={data} />
      ) : (
        <BeatLoader color={theme.colors.gray[100]} size={12} />
      )}
    </>
  );
};

const Burn: VFC = () => {
  const theme = useTheme();
  const { data: primitiveBurned, loading: loadingPrimitiveBurned } = usePrimitiveMaterialBurned();
  const { data: craftedBurned, loading: loadingCraftedBurned } = useCraftedMaterialBurned();

  const data = {
    labels: [...primitiveMaterialList, ...craftedMaterialList],
    datasets: [
      {
        label: "Total Burn",
        data: [
          primitiveBurned[0],
          primitiveBurned[2],
          primitiveBurned[4],
          primitiveBurned[6],
          craftedBurned[0],
          craftedBurned[2],
          craftedBurned[4],
          craftedBurned[6],
          craftedBurned[8],
          craftedBurned[10],
          craftedBurned[12],
          craftedBurned[14],
        ],
        backgroundColor: [
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.green[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
          theme.colors.yellow[100],
        ],
      },
    ],
  };
  return (
    <>
      {!loadingPrimitiveBurned && !loadingCraftedBurned ? (
        <Bar options={options} data={data} />
      ) : (
        <BeatLoader color={theme.colors.gray[100]} size={12} />
      )}
    </>
  );
};

const Index: NextPage = () => {
  const [chartType, setChartType] = useState<ChartType>("supply");

  return (
    <Flex w="100%" h="100%" pr="24" justify="center" align="center" direction="column">
      <Text fontSize="3xl">Material Analytics</Text>
      <Box h="2" />
      <Switch chartType={chartType} switchChartType={(chartType: ChartType) => setChartType(chartType)} />
      <Box h="12" />
      <Center w="4xl" h="md">
        {
          {
            supply: <Supply />,
            burned: <Burn />,
          }[chartType]
        }
      </Center>
      <Box h="2" />
      <HStack>
        <Flex align="center">
          <Box w="8" h="3" bgColor="green.100" />
          <Spacer w="1" />
          <Text>Primitive Material</Text>
        </Flex>
        <Box w="1" />
        <Flex align="center">
          <Box w="8" h="3" bgColor="yellow.100" />
          <Spacer w="1" />
          <Text>Crafted Material</Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Index;
