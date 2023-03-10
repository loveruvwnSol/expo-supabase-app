import React from "react";
import { Box } from "native-base";
import { useColorMode } from "native-base";
import { NotificationsCard } from "../organisms/NotificationsCard";
import { useUserIcon } from "../../hooks/useUserInfo";

export const NotificationsPage = () => {
  const { colorMode } = useColorMode();
  const usericon = useUserIcon();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <NotificationsCard usericon={usericon} />
    </Box>
  );
};
