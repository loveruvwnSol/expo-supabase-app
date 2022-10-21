import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text, Button, VStack, Avatar, Input } from "native-base";
import { supabase } from "../../libs/supabaseClient";

export const UserSettingsTop = () => {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  function sendData() {
    // supabase
    //   .from("profiles")
    //   .insert([
    //     {
    //       id: "",
    //       user_email: "",
    //       user_name: username,
    //       user_id: userid,
    //     },
    //   ])
    //   .then(({ data, error }) => {
    //     console.log({ data, error });
    //   });
  }

  return (
    <Box mb={20}>
      <VStack justifyContent="center" alignItems="center">
        <Box
          borderWidth={1}
          borderRadius={100}
          borderColor="gray.500"
          mr={5}
          mb={5}
        >
          <Avatar
            w={32}
            h={32}
            bg="lightBlue.400"
            // source={{
            //   uri: "",
            // }}
            size="xs"
          >
            Not set
            <Avatar.Badge background="white" size={8} borderWidth={1}>
              <Ionicons name="reload-circle-outline" size={28} />
            </Avatar.Badge>
          </Avatar>
        </Box>
        <Box mb={5}>
          <Text fontWeight="bold" mb={2}>
            ニックネーム
          </Text>
          <Input
            w={72}
            mb={5}
            variant="outline"
            placeholder="ニックネーム"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Text fontWeight="bold" mb={2}>
            ユーザーID
          </Text>
          <Input
            w={72}
            variant="outline"
            placeholder="ユーザーID"
            onChangeText={(text) => setUserid(text)}
            value={userid}
          />
        </Box>
        <Button onPress={() => sendData()}>設定する</Button>
      </VStack>
    </Box>
  );
};
