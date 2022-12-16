import React from "react";
import { Box } from "native-base";
import { useColorMode } from "native-base";
import { NotificationsCard } from "../organisms/NotificationsCard";
import {
  useNotificationsHistory,
  useUserIcon,
} from "../../hooks/useUserInfo";

export const NotificationsPage = () => {
  const { colorMode } = useColorMode();
  const usericon = useUserIcon();
  const notification = useNotificationsHistory();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.800" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <NotificationsCard usericon={usericon} notification={notification} />
    </Box>
  );
};
