import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, useColorMode } from "native-base";
import { UserSettingsParamList } from "../../types";
import { UserInfoList } from "../organisms/UserInfoList";
import { UserInfoTop } from "../organisms/UserInfoTop";
import {
  useNotifications,
  useUserIcon,
  useUserInfo,
} from "../../hooks/useUserInfo";

type UserSettingsStackscreenProps =
  NativeStackScreenProps<UserSettingsParamList>;

export const UserInfo = ({ navigation }: UserSettingsStackscreenProps) => {
  const user = useUserInfo();
  const usericon = useUserIcon();
  const notification = useNotifications();
  const { colorMode } = useColorMode();

  if (!user) return null;
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <UserInfoTop navigation={navigation} user={user} usericon={usericon} />
      <UserInfoList
        navigation={navigation}
        usericon={usericon}
        notification={notification}
      />
    </Box>
  );
};
