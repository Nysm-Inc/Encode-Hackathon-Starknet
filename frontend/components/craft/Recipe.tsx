import { VFC } from "react";
import { Abi } from "starknet";
import { useContract, useStarknetInvoke } from "@starknet-react/core";
import { Button, Tr, Td } from "~/components/common";
import { craftAbi } from "~/abi";
import { CraftContractAddress } from "~/constants";
import { Recipe } from "~/types";

const Recipe: VFC<{ recipe: Recipe }> = ({ recipe }) => {
  const { contract: craftContract } = useContract({
    abi: craftAbi as Abi,
    address: CraftContractAddress,
  });
  const { invoke: crafted } = useStarknetInvoke({
    contract: craftContract,
    method: recipe.method,
  });

  return (
    <Tr
      h="12"
      {...(recipe.condition
        ? {
            cursor: "pointer",
            onClick: () => crafted({ args: [] }),
          }
        : {
            cursor: "not-allowed",
            bgColor: "blackAlpha.600",
            color: "whiteAlpha.600",
          })}
    >
      <Td>{recipe.name}</Td>
      <Td>{recipe.recipe}</Td>
      <Td>{recipe.note}</Td>
      <Td>
        <Button
          size="xs"
          fontSize="xs"
          borderRadius="full"
          variant="solid"
          color="white"
          bgColor="primary.100"
          disabled={!recipe.condition}
        >
          {recipe.type}
        </Button>
      </Td>
    </Tr>
  );
};

export default Recipe;
