import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.code || accessToken !== undefined) return;

    fetch("/api/get_token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: router.query.code }),
    })
      .then(async (response) => {
        const data = await response.json();
        setAccessToken(data.accessToken || "");
      })
      .catch(() => {
        setAccessToken("");
      });
  }, [accessToken, router.query.code]);

  return (
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
      <Box>アクセストークンゲット</Box>
    </Flex>
  );
};

export default Home;
