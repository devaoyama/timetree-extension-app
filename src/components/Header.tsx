import React, { useCallback } from "react";
import Link from "next/link";
import {
  accessTokenActions,
  accessTokenSelectors,
} from "../states/accessToken";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  name?: string;
  imageUrl?: string;
};

export const Header: React.FC<Props> = ({ name, imageUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = accessTokenSelectors.useAccessToken();
  const setAccessToken = accessTokenActions.useSetAccessToken();
  const { hasCopied, onCopy } = useClipboard(accessToken || "");

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
          <MenuItem color="black" onClick={onOpen}>
            トークンを表示
          </MenuItem>
          <MenuItem color="black" onClick={onClickLogout}>
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>アクセストークン</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <Stack spacing={2}>
              <Input value={accessToken || ""} isReadOnly />
              <Button colorScheme="green" onClick={onCopy} ml={2}>
                {hasCopied ? "コピーしました" : "コピーする"}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
