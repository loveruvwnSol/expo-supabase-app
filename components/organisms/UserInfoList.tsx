import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Switch,
  IconButton,
  useColorMode,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";
import { useSwitchValue } from "../../hooks/useColorModeValue";
import { UserDetailList } from "../molecules/UserDetailList";

type UserInfoListProps = {
  usericon: string | undefined;
  navigation: any;
  notification: boolean | undefined;
};

export const UserInfoList: React.FC<UserInfoListProps> = ({
  navigation,
  notification,
}) => {
  const switchValue = useSwitchValue();
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  function sendNotificationsData() {
    supabase
      .from("options")
      .update({
        notification: !notification,
      })
      .eq("id", supabase.auth.user()?.id)
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
      });
  }

  async function sendThemeData() {
    toggleColorMode();
    await supabase
      .from("options")
      .update({
        theme: colorMode === "dark" ? "light" : "dark",
      })
      .eq("id", supabase.auth.user()?.id)
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
      });
  }

  return (
    <Box w={"xs"}>
      <Box ml={4} mr={5}>
        <Divider w={72} />
      </Box>
      <Box mt={4} ml={4} mr={5}>
        <Box mb={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize={16} fontWeight="thin">
              オプション
            </Text>
            <IconButton
              icon={
                <Ionicons
                  name="chevron-forward-circle-outline"
                  color="gray"
                  size={24}
                />
              }
              onPress={() => navigation.navigate("OptionSetting")}
            />
          </HStack>
          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Text opacity={0.5} fontWeight="thin">
              通知
            </Text>
            <Switch
              value={notification}
              onToggle={() => {
                sendNotificationsData();
              }}
            />
          </HStack>
          <HStack mt={3} justifyContent="space-between" alignItems="center">
            <Text opacity={0.5} fontWeight="thin">
              テーマ
            </Text>
            <Switch
              value={switchValue}
              offTrackColor="gray.300"
              offThumbColor="white"
              onTrackColor="black"
              onToggle={() => {
                sendThemeData();
              }}
            />
          </HStack>
        </Box>
        <Box mb={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize={16} fontWeight="thin">
              アカウント
            </Text>
            <IconButton
              icon={
                <Ionicons
                  name="chevron-forward-circle-outline"
                  color="gray"
                  size={24}
                />
              }
              onPress={() => navigation.navigate("UserDetailSetting")}
            />
          </HStack>
          <UserDetailList />
        </Box>
      </Box>
    </Box>
  );
};
