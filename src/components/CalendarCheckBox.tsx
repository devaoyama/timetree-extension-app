import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { calendarSelectors } from "../states/calendars";

export const CalendarCheckBox = () => {
  const { data } = calendarSelectors.useCalendars();

  return (
    <FormControl>
      <CheckboxGroup>
        <FormLabel>カレンダー</FormLabel>
        <Stack spacing={10} direction="row">
          {data?.map((calendar) => (
            <Checkbox key={calendar.id} colorScheme="green">
              {calendar.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};
