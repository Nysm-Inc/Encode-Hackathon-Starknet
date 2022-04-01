import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "~/components/common";
import { Cart, craftedMaterialList, primitiveMaterialList, MaterialType, WrapType, PhiImages } from "~/types";
import AddCart from "./AddCart";
import MaterialToolTip from "./MaterialTooltip";

const Inventry: FC<{
  label: "meta" | "phi";
  primitiveMaterials: number[];
  craftedMaterials: number[];
  wrapType: WrapType;
  materialType: MaterialType;
  cart: Cart;
  readonly?: boolean;
  addCart: (id: number) => void;
  removeCart: (id: number) => void;
}> = ({
  label,
  primitiveMaterials,
  craftedMaterials,
  wrapType,
  materialType,
  cart,
  readonly = false,
  addCart,
  removeCart,
}) => {
  const list = materialType === "primitive" ? primitiveMaterialList : craftedMaterialList;
  const materials = materialType === "primitive" ? primitiveMaterials : craftedMaterials;
  return (
    <Table>
      <Thead h="8">
        <Tr>
          <Th>Name</Th>
          <Th>Balance</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {list.map((name, id) => (
          <Tr key={`${id}_${wrapType}_${materialType}`} h="12" bgColor="blackAlpha.600">
            {label === "meta" ? (
              <Td>{name}</Td>
            ) : (
              <Td cursor="pointer">
                {PhiImages[materialType][id] ? (
                  // @ts-ignore
                  <MaterialToolTip _materialType={materialType} _id={id} _image={PhiImages[materialType][id]}>
                    {name}
                  </MaterialToolTip>
                ) : (
                  <>{name}</>
                )}
              </Td>
            )}
            <Td>{materials[id] || 0}</Td>
            <Td>
              <AddCart
                readonly={readonly}
                num={cart[wrapType][materialType][id]}
                balance={materials[id]}
                handleClickPlus={() => addCart(id)}
                handleClickMinus={() => removeCart(id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Inventry;
