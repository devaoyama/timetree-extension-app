import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { RequiredNotLogin } from "../components/RequiredNotLogin";
import { Button, Flex, Heading, Stack, Input } from "@chakra-ui/react";
import { accessTokenActions } from "../states/accessToken";

const TokenLogin: NextPage = () => {
  const [token, setToken] = useState<string>("");
  const setAccessToken = accessTokenActions.useSetAccessToken();

  const onClickButton = () => {
    setAccessToken(token);
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
          <Stack spacing={4} minW={{ base: "90%", md: "468px" }}>
            <Input
              variant="filled"
              placeholder="トークンを入力してください"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="green"
              width="full"
              onClick={onClickButton}
            >
              トークンでログイン
            </Button>
            <Link href="/login" passHref>
              <Button
                borderRadius={0}
                variant="link"
                colorScheme="gray.500"
                width="full"
              >
                通常ログインはこちら
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </RequiredNotLogin>
  );
};

export default TokenLogin;
