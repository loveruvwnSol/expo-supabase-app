import React from "react";
import { Box, useColorMode } from "native-base";
import { Posts } from "../organisms/Posts";

export const Timeline = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <Posts />
    </Box>
  );
};
