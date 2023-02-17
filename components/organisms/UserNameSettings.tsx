import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Input,
  useColorMode,
  IconButton,
  TextArea,
  Divider,
  ScrollView,
} from "native-base";
import { supabase } from "../../libs/supabaseClient";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type UserNameSettingsProps = {
  navigation: any;
};

export const UserNameSettings: React.FC<UserNameSettingsProps> = ({
  navigation,
}) => {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [selfIntro, setSeflIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  function updateName() {
    if (!username || !username.match(/\S/g)) return;
    supabase
      .from("profiles")
      .update([
        {
          id: supabase.auth.user()?.id,
          user_name: username,
        },
      ])
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("UserInfo");
      });
  }

  function updateId() {
    if (!userid || !userid.match(/\S/g)) return;
    supabase
      .from("profiles")
      .update([
        {
          id: supabase.auth.user()?.id,
          user_id: userid,
        },
      ])
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("UserInfo");
      });
  }

  function updateSelfIntro() {
    if (!selfIntro || !selfIntro.match(/\S/g)) return;
    supabase
      .from("profiles")
      .update([
        {
          id: supabase.auth.user()?.id,
          selfIntro: selfIntro,
        },
      ])
      .then(({ error }) => {
        if (error) Alert.alert(error.message);
        setLoading(false);
        if (!error) navigation.navigate("UserInfo");
      });
  }

  return (
    <ScrollView>
      <VStack alignItems="center">
        <Box mb={5}>
          <Text fontWeight="thin" mt={2} mb={2}>
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
            InputRightElement={
              <IconButton
                opacity={username ? 1 : 0.5}
                bg={"green.400"}
                icon={<Ionicons name="checkmark" color="green" />}
                disabled={loading}
                onPress={() => updateName()}
              />
            }
          />
          <Text fontWeight="thin" mt={2} mb={2}>
            ユーザーID
          </Text>
          <Input
            bg={colorMode === "dark" ? "coolGray.700" : "blueGray.100"}
            placeholderTextColor={colorMode === "dark" ? "white" : "black"}
            w={72}
            fontWeight="thin"
            mb={5}
            variant="outline"
            placeholder="ユーザーID"
            onChangeText={(text) => setUserid(text)}
            value={userid}
            InputRightElement={
              <IconButton
                opacity={userid ? 1 : 0.5}
                bg={"green.400"}
                icon={<Ionicons name="checkmark" color="green" />}
                disabled={loading}
                onPress={() => updateId()}
              />
            }
          />
          <Text fontWeight="thin" mt={2} mb={2}>
            ひとこと
          </Text>
          <TextArea
            variant="unstyled"
            bg={colorMode === "dark" ? "coolGray.700" : "blueGray.100"}
            placeholderTextColor={colorMode === "dark" ? "white" : "black"}
            w={72}
            fontWeight="thin"
            placeholder="ひとこと"
            onChangeText={(text) => setSeflIntro(text)}
            value={selfIntro}
            autoCompleteType={undefined}
            InputRightElement={
              <IconButton
                opacity={selfIntro ? 1 : 0.5}
                bg={"green.400"}
                icon={<Ionicons name="checkmark" color="green" />}
                disabled={loading}
                onPress={() => updateSelfIntro()}
              />
            }
          />
          <Divider w={72} />
        </Box>
      </VStack>
    </ScrollView>
  );
};
