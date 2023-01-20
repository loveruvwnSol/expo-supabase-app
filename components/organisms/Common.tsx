import React, { useState } from "react";
import { Box, Divider, HStack, Text, useColorMode, Switch } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useUserInfo } from "../../hooks/useUserInfo";
import { supabase } from "../../libs/supabaseClient";
import { useSwitchValue } from "../../hooks/useColorModeValue";
import { Alert } from "react-native";

export const Common = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useUserInfo();
  const [loading, setLoading] = useState(false);
  const switchValue = useSwitchValue();

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
    <Box>
      <Text ml={2} fontSize={10} opacity={0.5}>
        common
      </Text>
      <Box
        bg={colorMode === "dark" ? "black" : "white"}
        w={72}
        borderRadius={18}
      >
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="earth-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              言語
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text mr={2} opacity={colorMode === "dark" ? "0.5" : "0.3"}>
              {user && user.user_language}
            </Text>
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </HStack>
        <Divider />
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="cloudy-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              環境
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text mr={2} opacity={colorMode === "dark" ? "0.5" : "0.3"}>
              Production
            </Text>
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </HStack>
        <Divider />
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="tablet-portrait"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              プラットフォーム
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text mr={2} opacity={colorMode === "dark" ? "0.5" : "0.3"}>
              Default
            </Text>
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </HStack>
        <Divider />
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="construct-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              カスタムテーマ
            </Text>
          </HStack>
          <HStack alignItems="center">
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
        </HStack>
      </Box>
    </Box>
  );
};
