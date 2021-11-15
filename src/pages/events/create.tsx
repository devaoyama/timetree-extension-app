import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, RepeatClockIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import { Header } from "../../components/Header";
import { RequiredLogin } from "../../components/RequiredLogin";
import { userSelectors } from "../../states/user";
import { CalendarCheckBox } from "../../components/CalendarCheckBox";
import { CalendarLabelSelect } from "../../components/CalendarLabelSelect";
import { useAddEvent } from "../../hooks/events/useAddEvent";
import { useDialog } from "../../hooks/common/useDialog";

const now = dayjs();
const nowAfterHour = now.add(1, "hour");

const EventCreate = () => {
  const [title, setTitle] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [startAtDate, setStartAtDate] = useState(now.format("YYYY-MM-DD"));
  const [startAtTime, setStartAtTime] = useState(now.format("HH:00"));
  const [endAtDate, setEndAtDate] = useState(nowAfterHour.format("YYYY-MM-DD"));
  const [endAtTime, setEndAtTime] = useState(nowAfterHour.format("HH:00"));
  const [calendars, setCalendars] = useState<
    { id: string; name: string; labelId?: string }[]
  >([]);

  const { isOpen, open, close } = useDialog();
  const cancelRef = useRef(null);
  const toast = useToast();
  const { data } = userSelectors.useUser();
  const { add } = useAddEvent({
    onAddEvent: open,
    onAddEventError: () =>
      toast({
        title: "予定の作成に失敗しました",
        description: "フォームを確認してください",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      }),
  });

  const onClick = async () => {
    await add({
      userIds: data ? [data.id] : [],
      title,
      allDay,
      startAtDate,
      startAtTime,
      endAtDate,
      endAtTime,
      calendars,
    });
  };

  return (
    <RequiredLogin>
      <Header name={data?.name} imageUrl={data?.imageUrl} />
      <Box h="9vh" />
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
      <Container mb={5}>
        <Stack spacing={7}>
          <Input
            variant="flushed"
            placeholder="タイトル"
            focusBorderColor="green.300"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Flex justifyContent="space-between" align="center">
            <Text verticalAlign="center">
              <RepeatClockIcon mr={3} mb={1} />
              終日
            </Text>
            <Switch
              size="lg"
              colorScheme="green"
              onChange={(e) => setAllDay(e.target.checked)}
            />
          </Flex>
          <Flex align="center" pl={5}>
            <Text width="30%">開始</Text>
            <Stack width="100%">
              <Input
                type="date"
                value={startAtDate}
                onChange={(e) => setStartAtDate(e.target.value)}
              />
              {!allDay && (
                <Input
                  type="time"
                  value={startAtTime}
                  onChange={(e) => setStartAtTime(e.target.value)}
                />
              )}
            </Stack>
          </Flex>
          <Flex align="center" pl={5}>
            <Text width="30%">終了</Text>
            <Stack width="100%">
              <Input
                type="date"
                value={endAtDate}
                onChange={(e) => setEndAtDate(e.target.value)}
              />
              {!allDay && (
                <Input
                  type="time"
                  value={endAtTime}
                  onChange={(e) => setEndAtTime(e.target.value)}
                />
              )}
            </Stack>
          </Flex>
          <CalendarCheckBox
            onChange={(e, calendar) => {
              if (e.target.checked) {
                setCalendars((prev) => [
                  ...prev,
                  { id: calendar.id, name: calendar.name },
                ]);
              } else {
                setCalendars((prev) =>
                  prev.filter((val) => val.id !== calendar.id)
                );
              }
            }}
          />
          {calendars.length && (
            <Box>
              <Text verticalAlign="center">ラベル</Text>
              {calendars.map((calendar) => (
                <CalendarLabelSelect
                  key={calendar.id}
                  calendarId={calendar.id}
                  calendarName={calendar.name}
                  onChange={(labelId) => {
                    setCalendars((prev) =>
                      prev.map((val) => {
                        if (val.id === calendar.id) val.labelId = labelId;
                        return val;
                      })
                    );
                  }}
                />
              ))}
            </Box>
          )}
          <Button colorScheme="green" onClick={onClick}>
            作成
          </Button>
        </Stack>
      </Container>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={close}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={3}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              予定を作成しました。
            </AlertDialogHeader>

            <AlertDialogBody>予定の作成を続けますか？</AlertDialogBody>

            <AlertDialogFooter>
              <Link href="/" passHref>
                <Button>トップに戻る</Button>
              </Link>
              <Button colorScheme="green" onClick={close} ml={3}>
                続ける
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </RequiredLogin>
  );
};

export default EventCreate;
