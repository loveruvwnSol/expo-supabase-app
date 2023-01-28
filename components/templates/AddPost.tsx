import React from "react";
import { Box, HStack, useColorMode, Avatar, Button } from "native-base";
import { useUserIcon, useUserInfo } from "../../hooks/useUserInfo";
import { AddPostText } from "../organisms/AddPostText";
import { useNavigation } from "@react-navigation/native";

export const AddPost = () => {
  const { colorMode } = useColorMode();
  const usericon = useUserIcon();
  const user = useUserInfo();
  const nav = useNavigation();

  return (
    <Box
      bg={colorMode === "dark" ? "coolGray.900" : "blueGray.100"}
      w="full"
      h="full"
      alignItems="center"
    >
      <Box mt={10} w={96} justifyContent="space-between">
        <Box m={4}>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack>
              <Box mt={1}>
                <Avatar
                  w={12}
                  h={12}
                  borderWidth={0.5}
                  borderColor="gray.500"
                  source={{ uri: usericon }}
                  size="xs"
                  ml={1}
                />
              </Box>
              <AddPostText user={user} onSendFinish={() => nav.goBack()} />
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
