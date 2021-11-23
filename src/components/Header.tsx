import React, { useCallback } from "react";
import Link from "next/link";
import { accessTokenActions } from "../states/accessToken";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

type Props = {
  name?: string;
  imageUrl?: string;
};

export const Header: React.FC<Props> = ({ name, imageUrl }) => {
  const setAccessToken = accessTokenActions.useSetAccessToken();

  const onClickLogout = useCallback(() => {
    setAccessToken(undefined);
  }, [setAccessToken]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      bg="green.400"
      color="white"
      position="fixed"
      width="100%"
      zIndex="dropdown"
    >
      <Flex align="center" mr={5}>
        <Link href="/" passHref>
          <Heading as="h1" size="md" letterSpacing={"tighter"}>
            TimeTree拡張アプリ
          </Heading>
        </Link>
      </Flex>

      <Menu>
        <MenuButton as={Box}>
          <Avatar name={name} src={imageUrl} />
        </MenuButton>
        <MenuList>
          <MenuItem color="black">トークンを表示</MenuItem>
          <MenuItem color="black" onClick={onClickLogout}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
