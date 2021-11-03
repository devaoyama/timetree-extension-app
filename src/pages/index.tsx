import React, { useEffect } from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  accessTokenActions,
  accessTokenSelectors,
} from "../states/accessToken";
import { RequiredLogin } from "../components/common/RequiredLogin";

const Home: NextPage = () => {
  const router = useRouter();
  const accessToken = accessTokenSelectors.useAccessToken();
  const requestAccessToken = accessTokenActions.useRequestAccessToken();

  useEffect(() => {
    if (!router.query.code) return;
    requestAccessToken(router.query.code as string);
  }, [requestAccessToken, router.query.code]);

  return (
    <RequiredLogin>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="3"
          justifyContent="center"
          alignItems="center"
          width="full"
        >
          <Heading color="teal.400">Welcome</Heading>
        </Stack>
        <Box>ログイン中</Box>
        <Box>{accessToken}</Box>
      </Flex>
    </RequiredLogin>
  );
};

export default Home;
