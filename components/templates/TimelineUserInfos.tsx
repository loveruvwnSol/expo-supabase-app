import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, useColorMode } from "native-base";
import { TimelineParamList } from "../../types";
import { TimelineUserInfosTop } from "../organisms/TimelineUserInfosTop";
import { TimelineUserInfosList } from "../organisms/TimelineUserInfosList";

type UserSettingsStackscreenProps = NativeStackScreenProps<
  TimelineParamList,
  "TimelineUserInfos"
>;

export const TimelineUserInfos = ({ route }: UserSettingsStackscreenProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <TimelineUserInfosTop
        user_name={route.params.user_name}
        user_id={route.params.user_id}
        user_icon={route.params.user_icon}
        selfIntro={route.params.selfIntro}
      />
      <TimelineUserInfosList
        user_gender={route.params.user_gender}
        user_country={route.params.user_country}
        user_language={route.params.user_language}
      />
    </Box>
  );
};
