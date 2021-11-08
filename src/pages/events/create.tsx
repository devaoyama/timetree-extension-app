import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { Header } from "../../components/Header";
import { RequiredLogin } from "../../components/RequiredLogin";
import { userSelectors } from "../../states/user";
import { CalendarCheckBox } from "../../components/CalendarCheckBox";

const EventCreate = () => {
  const { data } = userSelectors.useUser();

  return (
    <RequiredLogin>
      <Header name={data?.name} imageUrl={data?.imageUrl} />
      <Box h="10vh" />
      <Flex align="center" mt={4} mb={6}>
        <Link href="/" passHref>
          <IconButton
            variant="link"
            colorScheme="green"
            aria-label="戻る"
            icon={<ChevronLeftIcon w={6} h={6} />}
            mr={2}
          />
        </Link>
        <Heading as="h2" size="md">
          予定を作成
        </Heading>
      </Flex>
      <Container>
        <Stack spacing={7}>
          <Input
            variant="flushed"
            placeholder="タイトル"
            focusBorderColor="green.300"
          />
          <Flex justifyContent="space-between" align="center">
            <Text verticalAlign="center">
              <RepeatClockIcon mr={3} mb={1} />
              終日
            </Text>
            <Switch size="lg" colorScheme="green" />
          </Flex>
          <Flex align="center" pl={5}>
            <Text width="30%">開始</Text>
            <Stack width="100%">
              <Input type="date" />
              <Input type="time" defaultValue="00:00" />
            </Stack>
          </Flex>
          <Flex align="center" pl={5}>
            <Text width="30%">終了</Text>
            <Stack width="100%">
              <Input type="date" />
              <Input type="time" defaultValue="00:00" />
            </Stack>
          </Flex>
          <CalendarCheckBox />
          <Button colorScheme="green">作成</Button>
        </Stack>
      </Container>
    </RequiredLogin>
  );
};

export default EventCreate;
