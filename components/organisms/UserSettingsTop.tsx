import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text, Button, VStack, Avatar, Input } from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";

type UserSettingsTopProps = {
  navigation: any;
};

export const UserSettingsTop: React.FC<UserSettingsTopProps> = ({
  navigation,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  function updateData() {
    supabase
      .from("profiles")
      .update([
        {
          id: session?.user?.id,
          user_name: username,
          user_id: userid,
        },
      ])
      .then(({ data, error }) => {
        alert("変更が適用されました");
        navigation.navigate("UserInfo")
      });
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
            <Ionicons name="person-outline" size={60} color="white" />
            <Avatar.Badge
              background="white"
              size={8}
              borderWidth={1}
              borderColor="black"
            >
              <Box ml={0.99}>
                <Ionicons name="reload-circle-outline" size={28} />
              </Box>
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
        <Button onPress={() => updateData()}>設定する</Button>
      </VStack>
    </Box>
  );
};
