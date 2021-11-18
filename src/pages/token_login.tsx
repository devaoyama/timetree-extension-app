import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { RequiredNotLogin } from "../components/RequiredNotLogin";
import { Button, Flex, Heading, Stack, Input, Box } from "@chakra-ui/react";

const TokenLogin: NextPage = () => {
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
            <Input variant="filled" placeholder="トークンを入力してください" />
            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="green"
              width="full"
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
