import React, { useState } from "react";
import { Box, Text, Button, VStack, Input, useColorMode } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";

type UserNameSettingsProps = {
  navigation: any;
};

export const UserNameSettings: React.FC<UserNameSettingsProps> = ({
  navigation,
}) => {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  function updateData() {
    supabase
      .from("profiles")
      .update([
        {
          id: supabase.auth.user()?.id,
          user_name: username,
          user_id: userid,
        },
      ])
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("UserInfo");
      });
  }

  return (
    <VStack alignItems="center">
      <Box mb={5}>
        <Text fontWeight="thin" mb={2}>
          ニックネーム
        </Text>
        <Input
          bg={colorMode === "dark" ? "coolGray.700" : "blueGray.100"}
          placeholderTextColor={colorMode === "dark" ? "white" : "black"}
          w={72}
          fontWeight="thin"
          mb={5}
          variant="outline"
          placeholder="ニックネーム"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text fontWeight="thin" mb={2}>
          ユーザーID
        </Text>
        <Input
          bg={colorMode === "dark" ? "coolGray.700" : "blueGray.100"}
          placeholderTextColor={colorMode === "dark" ? "white" : "black"}
          w={72}
          fontWeight="thin"
          variant="outline"
          placeholder="ユーザーID"
          onChangeText={(text) => setUserid(text)}
          value={userid}
        />
      </Box>
      <Button
        w={"48"}
        borderRadius={0}
        disabled={loading}
        onPress={() => updateData()}
      >
        設定する
      </Button>
    </VStack>
  );
};
