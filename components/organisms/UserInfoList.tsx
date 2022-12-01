import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Switch,
  IconButton,
  useColorMode,
} from "native-base";
import { InfoSelectList } from "../../Info";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";

type UserInfoListProps = {
  user: any;
  usericon: string | undefined;
  navigation: any;
  notification: boolean | undefined;
};

export const UserInfoList: React.FC<UserInfoListProps> = ({
  navigation,
  notification,
}) => {
  const [loading, setLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState<boolean>();
  const { colorMode, setColorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") {
      setSwitchValue(false);
    } else if (colorMode === "dark") {
      setSwitchValue(true);
    }
  }, [colorMode]);

  function sendNotificationsData() {
    supabase
      .from("options")
      .update({
        notification: !notification,
      })
      .eq("id", supabase.auth.user()?.id)
      .then(({ data, error }) => {
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
      .then(({ data, error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
      });
  }

  return (
    <Box w={"xs"}>
      <Box mt={4} ml={4}>
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
              mr={5}
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
              mr={5}
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
          {InfoSelectList.map((e, idx) => (
            <HStack
              key={idx}
              mt={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text opacity={0.5} fontWeight="thin">
                {e.title}
              </Text>
            </HStack>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
