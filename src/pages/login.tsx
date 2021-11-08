import React from "react";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { RequiredNotLogin } from "../components/RequiredNotLogin";

const Login: NextPage = () => {
  const router = useRouter();

  const onClickButton = () => {
    router.push(
      `https://timetr.ee/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_TIMETREE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_TIMETREE_REDIRECT_URI}&response_type=code`
    );
  };

  return (
    <RequiredNotLogin>
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
          <Box minW={{ base: "90%", md: "468px" }}>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={onClickButton}
            >
              ログイン
            </Button>
          </Box>
        </Stack>
        <Box>TimeTreeにログインします</Box>
      </Flex>
    </RequiredNotLogin>
  );
};

export default Login;
