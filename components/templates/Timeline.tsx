import React from "react";
import { Box, useColorMode } from "native-base";
import { Posts } from "../organisms/Posts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TimelineParamList } from "../../types";

type TimelineStackscreenProps = NativeStackScreenProps<TimelineParamList>;

export const Timeline = ({ navigation }: TimelineStackscreenProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <Posts navigation={navigation} />
    </Box>
  );
};
