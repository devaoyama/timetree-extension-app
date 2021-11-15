import React, { useState } from "react";
import { Flex, Select, Text } from "@chakra-ui/react";
import { labelSelectors } from "../states/labels";
type Props = {
  calendarId: string;
  calendarName: string;
  onChange: (labelId: string) => void;
};

export const CalendarLabelSelect: React.FC<Props> = ({
  calendarId,
  calendarName,
  onChange,
}) => {
  const [color, setColor] = useState<string | undefined>();
  const { data } = labelSelectors.useLabels(calendarId);

  return (
    <Flex align="center" pl={3} mb={2}>
      <Text width="30%">{calendarName}</Text>
      <Select
        color={color}
        focusBorderColor={color}
        placeholder="ラベルを選択してください"
        onChange={(e) => {
          setColor(data?.find((label) => label.id === e.target.value)?.color);
          onChange(e.target.value);
        }}
      >
        {data?.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
