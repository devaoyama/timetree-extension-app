import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const Loading = () => (
  <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
  >
    <Spinner color="green.400" />
  </Flex>
);
