import React from "react";
import Link from "next/link";
import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";

type Props = {
  name?: string;
  imageUrl?: string;
};

export const Header: React.FC<Props> = ({ name, imageUrl }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="green.400"
      color="white"
      position="fixed"
      width="100%"
    >
      <Flex align="center" mr={5}>
        <Link href="/" passHref>
          <Heading as="h1" size="md" letterSpacing={"tighter"}>
            TimeTree拡張アプリ
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }}>
        <Avatar name={name} src={imageUrl} />
      </Box>
    </Flex>
  );
};
