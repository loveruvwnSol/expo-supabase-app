import React from "react";
import { Box, Divider, HStack, Text, useColorMode, Switch } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { useNotifications } from "../../hooks/useUserInfo";
import { Alert } from "react-native";

export const Security = () => {
  const { colorMode } = useColorMode();
  const notification = useNotifications();

  function sendNotificationsData() {
    supabase
      .from("options")
      .update({
        notification: !notification,
      })
      .eq("id", supabase.auth.user()?.id)
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
      });
  }
  return (
    <Box>
      <Text ml={2} fontSize={10} opacity={0.5}>
        security
      </Text>
      <Box
        bg={colorMode === "dark" ? "coolGray.700" : "white"}
        w={72}
        borderRadius={18}
      >
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="key-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              パスワード
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </HStack>
        <Divider />
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="notifications-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              通知
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Switch
              value={notification}
              onToggle={() => {
                sendNotificationsData();
              }}
            />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
