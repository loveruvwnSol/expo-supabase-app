import React from "react";
import { Box, HStack, useColorMode, Avatar } from "native-base";
import { useUserIcon, useUserInfo } from "../../hooks/useUserInfo";
import { useNavigation } from "@react-navigation/native";
import { AddReplyText } from "../organisms/AddReplyText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TimelineParamList } from "../../types";

type TimelineStackscreenProps = NativeStackScreenProps<
  TimelineParamList,
  "AddReply"
>;

export const AddReply = ({ navigation, route }: TimelineStackscreenProps) => {
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
              <AddReplyText
                navigation={navigation}
                post_id={route.params.post_id}
                user={user}
                onSendFinish={() => nav.goBack()}
              />
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
