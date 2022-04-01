import { useEffect, useState } from "react";
import { useToast, UseToastOptions, Spinner, Flex, Link, ColorProps, IconButton, Spacer } from "@chakra-ui/react";
import { Status, TransactionStatus } from "starknet";
import { Transaction, useStarknetTransactionManager } from "@starknet-react/core";
import { voyagerGoerliURL } from "~/constants";
import { Text } from "~/components/common";
import { CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";

const statusMap: { [status in Status & TransactionStatus]: ColorProps["color"] } = {
  TRANSACTION_RECEIVED: "blue.300",
  NOT_RECEIVED: "red.300",
  RECEIVED: "blue.300",
  PENDING: "blue.300",
  ACCEPTED_ON_L2: "green.300",
  ACCEPTED_ON_L1: "green.300",
  REJECTED: "red.300",
};

const options = (tx: Transaction): UseToastOptions => {
  return {
    id: tx.transactionHash,
    position: "bottom-right",
    duration: null,
    isClosable: true,
    render: ({ onClose }) => (
      // @ts-ignore
      <Flex w="72" h="16" direction="column" justify="space-evenly" bg={statusMap[tx.status]} borderRadius="md">
        <Flex w="100%" pl="4" pr="2" justify="space-between" align="center">
          <Flex align="center">
            <InfoOutlineIcon color="white" />
            <Spacer w="2" />
            <Text fontSize="md" fontWeight="bold">
              {tx.status}
            </Text>
          </Flex>
          <IconButton
            variant="unstyled"
            size="xs"
            aria-label="close"
            icon={<CloseIcon color="white" w="3" h="3" />}
            onClick={onClose}
          />
        </Flex>
        <Flex w="100%" pl="10" pr="12" alignItems="center" justifyContent="space-between" align="center">
          <Link
            href={`${voyagerGoerliURL}/tx/${tx.transactionHash}`}
            isExternal
            textDecoration="underline"
            textDecorationColor="white"
            _hover={{ textDecorationColor: "white" }}
          >
            <Text>view on explorer</Text>
          </Link>
          <Spinner color="white" speed="0.7s" size="xs" />
        </Flex>
      </Flex>
    ),
  };
};

const TrackTxStarknet = () => {
  const [trackingQueue, setTrackingQueue] = useState<string[]>([]);
  const { transactions = [] } = useStarknetTransactionManager();
  const toast = useToast();

  useEffect(() => {
    if (transactions.length <= 0) return;

    transactions.forEach((tx) => {
      if (!toast.isActive(tx.transactionHash)) {
        if (!trackingQueue.includes(tx.transactionHash)) {
          setTrackingQueue((old) => [...old, tx.transactionHash]);
          toast(options(tx));
        }
      } else {
        toast.update(tx.transactionHash, options(tx));

        if (tx.status === "ACCEPTED_ON_L2") {
          setTimeout(() => {
            toast.close(tx.transactionHash);
          }, 3000);
        }
      }
    });
  }, [transactions, toast, trackingQueue]);

  return <></>;
};

export default TrackTxStarknet;
