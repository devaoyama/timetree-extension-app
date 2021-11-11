import React, { ChangeEvent } from "react";
import { Checkbox, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { calendarSelectors } from "../states/calendars";
import { Calendar } from "@timetreeapp/web-api";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>, calendar: Calendar) => void;
};

export const CalendarCheckBox: React.FC<Props> = ({ onChange }) => {
  const { data } = calendarSelectors.useCalendars();

  return (
    <FormControl>
      <FormLabel>カレンダー</FormLabel>
      <Stack spacing={10} direction="row">
        {data?.map((calendar) => (
          <Checkbox
            key={calendar.id}
            colorScheme="green"
            onChange={(e) => onChange(e, calendar)}
          >
            {calendar.name}
          </Checkbox>
        ))}
      </Stack>
    </FormControl>
  );
};
