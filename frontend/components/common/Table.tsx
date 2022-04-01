import { FC } from "react";
import {
  Box,
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableColumnHeaderProps,
  TableCellProps,
} from "@chakra-ui/react";

const Table: FC<TableProps> = (props) => (
  <Box border="1px solid" borderColor="gray.500" borderRadius="md">
    <ChakraTable variant="simple" size="sm" borderColor="gray.500" {...props}>
      {props.children}
    </ChakraTable>
  </Box>
);

const Thead: FC<TableHeadProps> = (props) => (
  <ChakraThead bgColor="gray.600" {...props}>
    {props.children}
  </ChakraThead>
);

const Tbody: FC<TableBodyProps> = (props) => (
  <ChakraTbody color="white" bgColor="gray.800" {...props}>
    {props.children}
  </ChakraTbody>
);

const Tr: FC<TableRowProps> = (props) => <ChakraTr {...props}>{props.children}</ChakraTr>;

const Td: FC<TableCellProps> = (props) => (
  <ChakraTd borderColor="gray.500" {...props}>
    {props.children}
  </ChakraTd>
);

const Th: FC<TableColumnHeaderProps> = (props) => (
  <ChakraTh color="white" borderColor="gray.500" {...props}>
    {props.children}
  </ChakraTh>
);

export { Table, Thead, Tbody, Tr, Th, Td };
