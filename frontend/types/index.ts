import {
  PhiBrick,
  PhiBrickHouse,
  PhiComputer,
  PhiDenki,
  PhiIron,
  PhiOil,
  PhiPla,
  PhiSeed,
  PhiSoil,
  PhiSteel,
} from "~/public";

export const primitiveMaterialList = ["Soil", "Oil", "Seed", "Iron"];

export const craftedMaterialList = [
  "Brick",
  "BrickHouse",
  "Wood",
  "IronSword",
  "Steel",
  "Plastic",
  "Computer",
  "ElectronicsStore",
];

export type CraftMethod =
  | "craft_soil_2_brick"
  | "craft_brick_2_brickHouse"
  | "forge_soilAndSeed_2_wood"
  | "craft_soilAndSeed_2_wood"
  | "craft_ironAndWood_2_ironSword"
  | "forge_iron_2_steel"
  | "craft_iron_2_steel"
  | "forge_oil_2_plastic"
  | "craft_oil_2_plastic"
  | "craft_plasticAndSteel_2_computer"
  | "craft_computer_2_electronicsStore";

export type ElapsedForgeTime = {
  soilAndWood: number;
  iron: number;
  oil: number;
};

export type RecipeArgs = {
  primitiveMaterials: number[];
  craftedMaterials: number[];
  elapsedForgeTime: ElapsedForgeTime;
};

export type Recipe = {
  name: string;
  recipe: string;
  note: string;
  type: "craft" | "claim";
  method: CraftMethod;
  condition: boolean;
};

const forgeTerm = 100;

export const recipes: ((args: RecipeArgs) => Recipe)[] = [
  ({ primitiveMaterials }: RecipeArgs): Recipe => {
    return {
      name: "Brick",
      recipe: "4 Soil",
      note: "",
      method: "craft_soil_2_brick",
      type: "craft",
      condition: primitiveMaterials[0] >= 4,
    };
  },
  ({ craftedMaterials }: RecipeArgs): Recipe => {
    return {
      name: "BrickHouse",
      recipe: "4 Brick",
      note: "",
      method: "craft_brick_2_brickHouse",
      type: "craft",
      condition: craftedMaterials[0] >= 4,
    };
  },
  ({ primitiveMaterials, elapsedForgeTime }: RecipeArgs): Recipe => {
    if (elapsedForgeTime.soilAndWood > 0) {
      return {
        name: "Wood",
        recipe: "",
        note: "",
        method: "craft_soilAndSeed_2_wood",
        type: "claim",
        condition: elapsedForgeTime.soilAndWood >= forgeTerm,
      };
    }
    return {
      name: "Wood",
      recipe: "1 Soil + 1 Seed",
      note: `${forgeTerm}s`,
      method: "forge_soilAndSeed_2_wood",
      type: "craft",
      condition: primitiveMaterials[0] >= 1 && primitiveMaterials[2] >= 1 && elapsedForgeTime.soilAndWood <= 0,
    };
  },
  ({ primitiveMaterials, craftedMaterials }: RecipeArgs): Recipe => {
    return {
      name: "IronSword",
      recipe: "1 Iron + 1 Wood",
      note: "",
      method: "craft_ironAndWood_2_ironSword",
      type: "craft",
      condition: primitiveMaterials[3] >= 1 && craftedMaterials[2] >= 1,
    };
  },
  ({ primitiveMaterials, elapsedForgeTime }: RecipeArgs): Recipe => {
    if (elapsedForgeTime.iron > 0) {
      return {
        name: "Steel",
        recipe: "",
        note: "",
        method: "craft_iron_2_steel",
        type: "claim",
        condition: elapsedForgeTime.iron >= forgeTerm,
      };
    }
    return {
      name: "Steel",
      recipe: "1 Iron",
      note: `${forgeTerm}s`,
      method: "forge_iron_2_steel",
      type: "craft",
      condition: primitiveMaterials[3] >= 1 && elapsedForgeTime.iron <= 0,
    };
  },
  ({ primitiveMaterials, elapsedForgeTime }: RecipeArgs): Recipe => {
    if (elapsedForgeTime.oil > 0) {
      return {
        name: "Plastic",
        recipe: "",
        note: "",
        method: "craft_oil_2_plastic",
        type: "claim",
        condition: elapsedForgeTime.oil >= forgeTerm,
      };
    }
    return {
      name: "Plastic",
      recipe: "1 Oil",
      note: `${forgeTerm}s`,
      method: "forge_oil_2_plastic",
      type: "craft",
      condition: primitiveMaterials[1] >= 1 && elapsedForgeTime.oil <= 0,
    };
  },
  ({ craftedMaterials }: RecipeArgs): Recipe => {
    return {
      name: "Computer",
      recipe: "2 Plastic + 1 Steel",
      note: "",
      method: "craft_plasticAndSteel_2_computer",
      type: "craft",
      condition: craftedMaterials[5] >= 2 && craftedMaterials[4] >= 1,
    };
  },
  ({ craftedMaterials }: RecipeArgs): Recipe => {
    return {
      name: "ElectronicsStore",
      recipe: "4 Computer",
      note: "",
      method: "craft_computer_2_electronicsStore",
      type: "craft",
      condition: craftedMaterials[6] >= 4,
    };
  },
];

export type WrapType = "wrap" | "unwrap";
export type MaterialType = "primitive" | "crafted";
export type Cart = {
  [key in WrapType]: {
    [key in MaterialType]: number[];
  };
};

export const PhiImages: { primitive: StaticImageData[]; crafted: (StaticImageData | null)[] } = {
  primitive: [PhiSoil, PhiOil, PhiSeed, PhiIron],
  crafted: [PhiBrick, PhiBrickHouse, null, null, PhiSteel, PhiPla, PhiComputer, PhiDenki],
};
