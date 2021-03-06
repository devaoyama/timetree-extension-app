import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
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
        width="100ww"
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
          <Heading color="green.400">Welcome</Heading>
          <Stack spacing={3} minW={{ base: "90%", md: "468px" }}>
            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="green"
              width="full"
              onClick={onClickButton}
            >
              ログイン
            </Button>
            <Link href="/token_login" passHref>
              <Button
                borderRadius={0}
                variant="outline"
                colorScheme="gray.500"
                width="full"
              >
                トークンでログイン
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Box>TimeTreeにログインします</Box>
      </Flex>
    </RequiredNotLogin>
  );
};

export default Login;
