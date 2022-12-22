import React from "react";
import { Box, Divider, HStack, Text, useColorMode, Link } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useUserInfo } from "../../hooks/useUserInfo";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";

type AccountProps = {
  navigation: any;
};

export const Account: React.FC<AccountProps> = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const user = useUserInfo();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    if (!error) navigation.navigate("LogIn");
  }

  return (
    <Box>
      <Text ml={2} fontSize={10} opacity={0.5}>
        account
      </Text>
      <Box
        bg={colorMode === "dark" ? "coolGray.700" : "white"}
        w={72}
        borderRadius={18}
      >
        <HStack alignItems="center" justifyContent="space-between" m={2}>
          <HStack>
            <Ionicons
              name="call-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              電話番号
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
              name="cloudy-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              Email
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text mr={2} opacity={colorMode === "dark" ? "0.5" : "0.3"}>
              {user && user.user_email}
            </Text>
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </HStack>
        <Divider />
        <Link
          justifyContent="space-between"
          m={2}
          onPress={() => {
            signOut();
          }}
        >
          <HStack>
            <Ionicons
              name="log-out-outline"
              color={colorMode === "dark" ? "white" : "gray"}
              size={20}
            />
            <Text ml={2} fontWeight="thin" fontSize={16}>
              ログアウト
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Ionicons name="chevron-forward-outline" color="gray" size={16} />
          </HStack>
        </Link>
      </Box>
    </Box>
  );
};
