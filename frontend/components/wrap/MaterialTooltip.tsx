import { FC } from "react";
import { Center, Tooltip as ChakraTooltip, TooltipProps } from "@chakra-ui/react";
import Image from "next/image";
import { MaterialType } from "~/types";

// todo
const percel1 = [97, 49, 1.5];
const percel2 = [97, 121, 1.2];
const sizes = {
  primitive: [percel1, percel1, percel1, percel1],
  crafted: [percel1, percel2, percel1, percel1, percel1, percel1, percel2, percel2],
};

const MaterialToolTip: FC<{ _materialType: MaterialType; _id: number; _image: StaticImageData } & TooltipProps> = (
  props
) => {
  const width = sizes[props._materialType][props._id][0];
  const height = sizes[props._materialType][props._id][1];
  const ratio = sizes[props._materialType][props._id][2];
  const pt = ratio === 1.5 ? 4 : 0;
  const pb = ratio === 1.2 ? 4 : 0;
  return (
    <ChakraTooltip
      bgColor="whiteAlpha.800"
      placement="top-start"
      label={
        <Center pt={pt} pb={pb}>
          <Image width={`${width * ratio}px`} height={`${height * ratio}px`} src={props._image} />
        </Center>
      }
      {...props}
    >
      {props.children}
    </ChakraTooltip>
  );
};

export default MaterialToolTip;
